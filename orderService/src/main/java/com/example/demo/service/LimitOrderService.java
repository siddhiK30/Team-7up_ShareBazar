// service/LimitOrderService.java
package com.example.demo.service;

import com.example.demo.dto.LimitOrderRequest;
import com.example.demo.entity.LimitOrder;
import com.example.demo.entity.Order;
import com.example.demo.repo.LimitOrderRepository;
import com.example.demo.repo.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class LimitOrderService {

    @Autowired
    private LimitOrderRepository limitOrderRepo;

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private RestTemplate restTemplate;

    // ─────────────────────────────────────────────
    // 1. PLACE a limit order (just save, don't execute yet)
    // ─────────────────────────────────────────────
    public LimitOrder placeLimitOrder(LimitOrderRequest req) {

        LimitOrder limitOrder = new LimitOrder();
        limitOrder.setUserId(req.getUserId());
        limitOrder.setPortfolioId(req.getPortfolioId());
        limitOrder.setCompanyId(req.getCompanyId());
        limitOrder.setQuantity(req.getQuantity());
        limitOrder.setTargetPrice(req.getTargetPrice());
        limitOrder.setCurrentPrice(req.getCurrentPrice());
        limitOrder.setOrderType(req.getOrderType().toUpperCase());
        limitOrder.setStatus("PENDING");

        // Set expiry if provided
        if (req.getExpiryHours() != null && req.getExpiryHours() > 0) {
            limitOrder.setExpiresAt(
                LocalDateTime.now().plusHours(req.getExpiryHours())
            );
        }

        return limitOrderRepo.save(limitOrder);
    }

    // ─────────────────────────────────────────────
    // 2. CANCEL a pending limit order
    // ─────────────────────────────────────────────
    public LimitOrder cancelLimitOrder(Long id, Long userId) {
        LimitOrder lo = limitOrderRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Limit order not found"));

        if (!lo.getUserId().equals(userId)) {
            throw new RuntimeException("Unauthorized");
        }
        if (!lo.getStatus().equals("PENDING")) {
            throw new RuntimeException("Only PENDING orders can be cancelled");
        }

        lo.setStatus("CANCELLED");
        return limitOrderRepo.save(lo);
    }

    // ─────────────────────────────────────────────
    // 3. GET all limit orders for a user
    // ─────────────────────────────────────────────
    public List<LimitOrder> getUserLimitOrders(Long userId) {
        return limitOrderRepo.findByUserIdOrderByCreatedAtDesc(userId);
    }

    // ─────────────────────────────────────────────
    // 4. EXECUTE a single limit order (called by scheduler)
    // ─────────────────────────────────────────────
    public void executeLimitOrder(LimitOrder lo, double livePrice) {
        try {
            double totalAmount = lo.getQuantity() * livePrice;

            if (lo.getOrderType().equals("BUY")) {
                // Debit wallet
                String walletUrl = "http://localhost:8084/wallet/debit";
                Map<String, Object> walletReq = new HashMap<>();
                walletReq.put("userId", String.valueOf(lo.getUserId()));
                walletReq.put("amount", totalAmount);

                String walletRes = restTemplate.postForObject(
                    walletUrl, walletReq, String.class
                );
                if (walletRes == null || !walletRes.contains("success")) {
                    markFailed(lo, "Wallet debit failed: " + walletRes);
                    return;
                }

                // Add stock to portfolio
                String portfolioUrl = "http://localhost:8085/portfolio/internal/addStock";
                Map<String, Object> portfolioReq = new HashMap<>();
                portfolioReq.put("portfolioId", lo.getPortfolioId());
                portfolioReq.put("companyId", lo.getCompanyId());
                portfolioReq.put("qty", lo.getQuantity());
                portfolioReq.put("price", livePrice);
                restTemplate.postForObject(portfolioUrl, portfolioReq, Void.class);

            } else if (lo.getOrderType().equals("SELL")) {
                // Remove stock from portfolio
                String portfolioUrl = "http://localhost:8085/portfolio/internal/sellStock";
                Map<String, Object> portfolioReq = new HashMap<>();
                portfolioReq.put("portfolioId", lo.getPortfolioId());
                portfolioReq.put("companyId", lo.getCompanyId());
                portfolioReq.put("qty", lo.getQuantity());
                restTemplate.postForObject(portfolioUrl, portfolioReq, Void.class);

                // Credit wallet
                String walletUrl = "http://localhost:8084/wallet/credit";
                Map<String, Object> walletReq = new HashMap<>();
                walletReq.put("userId", String.valueOf(lo.getUserId()));
                walletReq.put("amount", totalAmount);

                String walletRes = restTemplate.postForObject(
                    walletUrl, walletReq, String.class
                );
                if (walletRes == null || !walletRes.contains("success")) {
                    markFailed(lo, "Wallet credit failed: " + walletRes);
                    return;
                }
            }

            // Save executed order to orders table
            Order order = new Order();
            order.setUserId(lo.getUserId());
            order.setPortfolioId(lo.getPortfolioId());
            order.setCompanyId(lo.getCompanyId());
            order.setQuantity(lo.getQuantity());
            order.setPrice(livePrice);
            order.setOrderType("LIMIT_" + lo.getOrderType());
            order.setStatus("SUCCESS");
            orderRepo.save(order);

            // Mark limit order as EXECUTED
            lo.setStatus("EXECUTED");
            lo.setExecutedAt(LocalDateTime.now());
            limitOrderRepo.save(lo);

        } catch (Exception e) {
            markFailed(lo, e.getMessage());
        }
    }

    private void markFailed(LimitOrder lo, String reason) {
        lo.setStatus("FAILED");
        lo.setFailureReason(reason);
        limitOrderRepo.save(lo);
    }
}
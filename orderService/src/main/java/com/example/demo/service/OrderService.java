package com.example.demo.service;

import java.util.HashMap;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.client.RestTemplate;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.repo.OrderRepository;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private RestTemplate restTemplate;

    public Order buy(OrderRequest req) {
        double totalAmount = req.getQuantity() * req.getPrice();

        // 🔥 WALLET DEBIT
        String walletUrl = "http://localhost:8084/wallet/debit";
        Map<String, Object> walletReq = new HashMap<>();
        walletReq.put("userId", String.valueOf(req.getUserId()));  // ✅ String
        walletReq.put("amount", totalAmount);

        String walletRes = restTemplate.postForObject(walletUrl, walletReq, String.class);
        if (!walletRes.contains("success")) {
            throw new RuntimeException("Wallet debit failed: " + walletRes);
        }

        // 🔥 PORTFOLIO UPDATE
        String portfolioUrl = "http://localhost:8085/portfolio/internal/addStock";
        Map<String, Object> portfolioReq = new HashMap<>();
        portfolioReq.put("portfolioId", req.getPortfolioId());
        portfolioReq.put("companyId", req.getCompanyId());
        portfolioReq.put("qty", req.getQuantity());
        portfolioReq.put("price", req.getPrice());

        restTemplate.postForObject(portfolioUrl, portfolioReq, Void.class);

        // 🔥 SAVE ORDER
        Order order = new Order();
        order.setUserId(req.getUserId());
        order.setPortfolioId(req.getPortfolioId());
        order.setCompanyId(req.getCompanyId());
        order.setQuantity(req.getQuantity());
        order.setPrice(req.getPrice());
        order.setOrderType("BUY");
        order.setStatus("SUCCESS");

        return orderRepo.save(order);
    }

    public Order sell(OrderRequest req) {
        double totalAmount = req.getQuantity() * req.getPrice();

        // 🔥 1. UPDATE PORTFOLIO
        String portfolioUrl = "http://localhost:8085/portfolio/internal/sellStock";
        Map<String, Object> portfolioReq = new HashMap<>();
        portfolioReq.put("portfolioId", req.getPortfolioId());
        portfolioReq.put("companyId", req.getCompanyId());
        portfolioReq.put("qty", req.getQuantity());

        restTemplate.postForObject(portfolioUrl, portfolioReq, Void.class);

        // 🔥 2. CREDIT WALLET
        String walletUrl = "http://localhost:8084/wallet/credit";
        Map<String, Object> walletReq = new HashMap<>();
        walletReq.put("userId", String.valueOf(req.getUserId()));  // ✅ String
        walletReq.put("amount", totalAmount);

        String walletRes = restTemplate.postForObject(walletUrl, walletReq, String.class);
        if (!walletRes.contains("success")) {
            throw new RuntimeException("Wallet credit failed: " + walletRes);
        }

        // 🔥 3. SAVE ORDER
        Order order = new Order();
        order.setUserId(req.getUserId());
        order.setPortfolioId(req.getPortfolioId());
        order.setCompanyId(req.getCompanyId());
        order.setQuantity(req.getQuantity());
        order.setPrice(req.getPrice());
        order.setOrderType("SELL");
        order.setStatus("SUCCESS");

        return orderRepo.save(order);
    }
}
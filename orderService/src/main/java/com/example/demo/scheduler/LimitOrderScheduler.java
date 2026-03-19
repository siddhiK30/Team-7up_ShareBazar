// scheduler/LimitOrderScheduler.java
package com.example.demo.scheduler;

import com.example.demo.entity.LimitOrder;
import com.example.demo.repo.LimitOrderRepository;
import com.example.demo.service.LimitOrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Component
public class LimitOrderScheduler {

    private static final Logger log = LoggerFactory.getLogger(LimitOrderScheduler.class);

    @Autowired
    private LimitOrderRepository limitOrderRepo;

    @Autowired
    private LimitOrderService limitOrderService;

    @Autowired
    private RestTemplate restTemplate;

    // ─── Runs every 10 seconds ───
    @Scheduled(fixedDelay = 10000)
    public void checkLimitOrders() {

        // 1. Expire old orders first
        expireOldOrders();

        // 2. Fetch all PENDING orders
        List<LimitOrder> pendingOrders = limitOrderRepo.findByStatus("PENDING");

        if (pendingOrders.isEmpty()) return;

        log.info("🔍 Checking {} pending limit orders...", pendingOrders.size());

        for (LimitOrder lo : pendingOrders) {
            try {
                // Fetch LIVE price for this company
                // Adjust URL to match your company/price service
                double livePrice = fetchLivePrice(lo.getCompanyId());

                boolean shouldExecute = false;

                if (lo.getOrderType().equals("BUY")) {
                    // BUY limit: execute when price drops to or below target
                    shouldExecute = livePrice <= lo.getTargetPrice();

                } else if (lo.getOrderType().equals("SELL")) {
                    // SELL limit: execute when price rises to or above target
                    shouldExecute = livePrice >= lo.getTargetPrice();
                }

                if (shouldExecute) {
                    log.info("✅ Executing {} limit order #{} at price {}",
                        lo.getOrderType(), lo.getId(), livePrice);
                    limitOrderService.executeLimitOrder(lo, livePrice);
                }

            } catch (Exception e) {
                log.error("❌ Error checking limit order #{}: {}", lo.getId(), e.getMessage());
            }
        }
    }

    // ─── Expire orders past their expiry time ───
    private void expireOldOrders() {
        List<LimitOrder> expired = limitOrderRepo.findExpiredOrders(LocalDateTime.now());
        for (LimitOrder lo : expired) {
            lo.setStatus("EXPIRED");
            limitOrderRepo.save(lo);
            log.info("⏰ Expired limit order #{}", lo.getId());
        }
    }

    // ─── Fetch live price from your company service ───
    @SuppressWarnings("unchecked")
    private double fetchLivePrice(Long companyId) {
        // Adjust URL to match your stock/company price endpoint
        String url = "http://localhost:8083/companies/" + companyId;
        Map<String, Object> company = restTemplate.getForObject(url, Map.class);
        if (company == null || !company.containsKey("price")) {
            throw new RuntimeException("Could not fetch price for company " + companyId);
        }
        return Double.parseDouble(company.get("price").toString());
    }
}
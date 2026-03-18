package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Entity.Portfolio;
import com.example.demo.Entity.Holding;
import com.example.demo.Entity.LatestPrice;
import com.example.demo.Entity.Stock;
import com.example.demo.dto.HoldingResponse;
import com.example.demo.repo.HoldingRepository;
import com.example.demo.repo.LatestPriceRepository;
import com.example.demo.repo.PortfolioRepository;
import com.example.demo.repo.StockRepository;

@Service
public class PortfolioService {

    @Autowired
    private PortfolioRepository portfolioRepo;

    @Autowired
    private HoldingRepository holdingRepo;

    @Autowired
    private LatestPriceRepository priceRepo;

    @Autowired
    private StockRepository stockRepo;    // ✅ ADD THIS

    public Portfolio createPortfolio(Long userId, String name) {
        Portfolio p = new Portfolio();
        p.setUserId(userId);
        p.setName(name);
        return portfolioRepo.save(p);
    }

    public List<Portfolio> getUserPortfolios(Long userId) {
        return portfolioRepo.findByUserId(userId);
    }

    public List<HoldingResponse> getHoldings(Long portfolioId) {

        List<Holding> holdings = holdingRepo.findByPortfolioId(portfolioId);

        List<Long> ids = holdings.stream()
                .map(Holding::getCompanyId)
                .collect(Collectors.toList());

        // ✅ Price map
        Map<Long, Double> priceMap = priceRepo.findByStockIdIn(ids)
                .stream()
                .collect(Collectors.toMap(
                        LatestPrice::getStockId,
                        LatestPrice::getPrice
                ));

        // ✅ ADD: Stock name map
        Map<Long, Stock> stockMap = stockRepo.findAllById(ids)
                .stream()
                .collect(Collectors.toMap(
                        Stock::getId,
                        stock -> stock
                ));

        List<HoldingResponse> res = new ArrayList<>();

        for (Holding h : holdings) {

            double current = priceMap.getOrDefault(h.getCompanyId(), 0.0);
            double avg = h.getAvgBuyPrice();
            double pl = (current - avg) * h.getQuantity();
            double plPercent = avg == 0 ? 0 : ((current - avg) / avg) * 100;

            HoldingResponse r = new HoldingResponse();
            r.setCompanyId(h.getCompanyId());
            r.setQuantity(h.getQuantity());
            r.setAvgBuyPrice(avg);
            r.setCurrentPrice(current);
            r.setProfitLoss(pl);
            r.setProfitLossPercent(plPercent);

            // ✅ ADD: Set stock name
            Stock stock = stockMap.get(h.getCompanyId());
            if (stock != null) {
                r.setCompanyName(stock.getCompanyName());
                r.setCompanyCode(stock.getCompanyCode());
            }

            res.add(r);
        }

        return res;
    }

    public void addStock(Long portfolioId, Long companyId, int qty, double price) {
        Holding h = holdingRepo
                .findByPortfolioIdAndCompanyId(portfolioId, companyId)
                .orElse(null);

        if (h == null) {
            h = new Holding();
            h.setPortfolioId(portfolioId);
            h.setCompanyId(companyId);
            h.setQuantity(qty);
            h.setAvgBuyPrice(price);
        } else {
            int total = h.getQuantity() + qty;
            double newAvg = ((h.getQuantity() * h.getAvgBuyPrice())
                    + (qty * price)) / total;
            h.setQuantity(total);
            h.setAvgBuyPrice(newAvg);
        }

        h.setUpdatedAt(LocalDateTime.now());
        holdingRepo.save(h);
    }

    public void sellStock(Long portfolioId, Long companyId, int qty) {
        Holding h = holdingRepo
                .findByPortfolioIdAndCompanyId(portfolioId, companyId)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        if (h.getQuantity() < qty) {
            throw new RuntimeException("Not enough shares");
        }

        int remaining = h.getQuantity() - qty;
        if (remaining == 0) {
            holdingRepo.delete(h);
        } else {
            h.setQuantity(remaining);
            h.setUpdatedAt(LocalDateTime.now());
            holdingRepo.save(h);
        }
    }
}
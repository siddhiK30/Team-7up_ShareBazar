package com.example.simulation_engine.Services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.simulation_engine.Entities.LatestPrice;
import com.example.simulation_engine.Entities.PriceHistory;
import com.example.simulation_engine.Entities.Stock;
import com.example.simulation_engine.Repositories.LatestPriceRepository;
import com.example.simulation_engine.Repositories.PriceHistoryRepository;
import com.example.simulation_engine.Repositories.StockRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SnapshotService {

    private final StockRepository stockRepo;
    private final LatestPriceRepository latestRepo;
    private final PriceHistoryRepository historyRepo;
    private final RedisTemplate<String, Object> redisTemplate;

    @Scheduled(fixedRate = 30000)
    public void persistPrices() {

        List<Stock> stocks = stockRepo.findAll();
        System.out.println("Stocks fetched: " + stocks.size());

        for (Stock stock : stocks) {

            String code = stock.getCompanyCode();

            Object val = redisTemplate.opsForHash().get("prices", code);
            if (val == null) continue;

            double price = Double.parseDouble(val.toString());

            // Update latest
            LatestPrice lp = new LatestPrice();
            lp.setStockId(stock.getId());
            lp.setPrice(price);
            lp.setLastUpdated(LocalDateTime.now());

            latestRepo.save(lp);

            // Insert history
            PriceHistory ph = new PriceHistory();
            ph.setStockId(stock.getId());
            ph.setPrice(price);
            ph.setTimestamp(LocalDateTime.now());

            historyRepo.save(ph);
            System.out.println("Stocks count: " + stockRepo.findAll().size());
        }
    }
}

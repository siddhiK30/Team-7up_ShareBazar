package com.example.simulation_engine.Services;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.example.simulation_engine.Entities.LatestPrice;
import com.example.simulation_engine.Entities.PriceHistory;
import com.example.simulation_engine.Entities.Stock;
import com.example.simulation_engine.Repositories.LatestPriceRepository;
import com.example.simulation_engine.Repositories.PriceHistoryRepository;
import com.example.simulation_engine.Repositories.StockHistoryRepository;

@Service
public class PriceService {

    @Autowired private StockHistoryRepository stockRepo;
    @Autowired private RedisTemplate<String, Object> redisTemplate;
    @Autowired private LatestPriceRepository latestRepo;
    @Autowired private PriceHistoryRepository historyRepo;
    @Autowired private SimpMessagingTemplate messagingTemplate;

    private final Map<String, Double> inMemoryPrices = new ConcurrentHashMap<>();

    // Reusable thread pool (NOT created per call)
    private final ExecutorService executor = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors() * 2);

    // =========================
    // UPDATE PRICES (PARALLEL)
    // =========================
    public void updatePrices() {

        List<Stock> stocks = stockRepo.findAll()
                .stream()
                .filter(Stock::isActive)
                .toList();

        int total = stocks.size();
        if (total == 0) return;

        int batchSize = 10;
        int threadCount = Math.min(
                Runtime.getRuntime().availableProcessors() * 2,
                (int) Math.ceil((double) total / batchSize)
        );

        // long startTime = System.currentTimeMillis();

        System.out.println("\n[UPDATE] START | Stocks: " + total +" | Threads: " + threadCount +" | Time: " + LocalTime.now());

        List<Future<?>> futures = new ArrayList<>();

        for (int i = 0; i < total; i += batchSize) {

            int start = i;
            int end = Math.min(i + batchSize, total);

            List<Stock> batch = stocks.subList(start, end);

            futures.add(executor.submit(() -> processUpdateBatch(batch)));
        }

        waitAll(futures);
        System.out.println("working");

        // Single broadcast
        Map<Object, Object> prices = redisTemplate.opsForHash().entries("prices");
        messagingTemplate.convertAndSend("/topic/prices", prices);
    }

    private void processUpdateBatch(List<Stock> batch) {

        System.out.println("[THREAD] " + Thread.currentThread().getName() +" processing batch size: " + batch.size());

        for (Stock stock : batch) {

            String code = stock.getCompanyCode();

            double oldPrice = inMemoryPrices.getOrDefault(code, stock.getFaceValue());

            double change = (Math.random() - 0.5) * 0.001 * stock.getVolatilityFactor();
            double newPrice = Math.max(1, oldPrice * (1 + change));

            inMemoryPrices.put(code, newPrice);
            redisTemplate.opsForHash().put("prices", code, newPrice);

            System.out.println("[PRICE] " + Thread.currentThread().getName() + " | " + code + " -> " + newPrice);
        }
    }

    // =========================
    // PERSIST PRICES (PARALLEL)
    // =========================
    public void persistPrices() {

        List<Stock> stocks = stockRepo.findAll();
        int total = stocks.size();

        if (total == 0) return;

        LocalDateTime now = LocalDateTime.now();

        int batchSize = 10;

        List<Future<?>> futures = new ArrayList<>();

        for (int i = 0; i < total; i += batchSize) {

            int start = i;
            int end = Math.min(i + batchSize, total);

            List<Stock> batch = stocks.subList(start, end);

            futures.add(executor.submit(() -> processPersistBatch(batch, now)));
        }

        waitAll(futures);
    }

    private void processPersistBatch(List<Stock> batch, LocalDateTime now) {

        for (Stock stock : batch) {

            String code = stock.getCompanyCode();

            Object val = redisTemplate.opsForHash().get("prices", code);
            if (val == null) continue;

            double price = Double.parseDouble(val.toString());

            LatestPrice lp = new LatestPrice();
            lp.setStockId(stock.getId());
            lp.setPrice(price);
            lp.setLastUpdated(now);
            latestRepo.save(lp);

            PriceHistory ph = new PriceHistory();
            ph.setStockId(stock.getId());
            ph.setPrice(price);
            ph.setTimestamp(now);
            historyRepo.save(ph);
        }
    }

    // =========================
    // COMMON UTIL
    // =========================
    private void waitAll(List<Future<?>> futures) {
        for (Future<?> f : futures) {
            try {
                f.get();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}

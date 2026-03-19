package com.example.simulation_engine.Services;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.simulation_engine.Entities.Stock;
import com.example.simulation_engine.Repositories.StockRepository;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PriceEngineService {

    private final StockRepository stockRepo;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SimpMessagingTemplate messagingTemplate;

    private final Map<String, Double> inMemoryPrices = new ConcurrentHashMap<>();

    

    @PostConstruct
    public void init() {
        stockRepo.findAll().forEach(stock -> {
            inMemoryPrices.put(stock.getCompanyCode(), stock.getFaceValue());
        });
    }

    @Scheduled(fixedRate = 1000)
    public void updatePrices() {
        System.out.println("SCHEDULER RUNNING...");

        for (Stock stock : stockRepo.findAll()) {

            if (!stock.isActive()) continue;

            String code = stock.getCompanyCode();
            double oldPrice = inMemoryPrices.getOrDefault(code, stock.getFaceValue());

            double change = (Math.random() - 0.5) * 0.001 * stock.getVolatilityFactor();

            double newPrice = oldPrice * (1 + change);

            if (newPrice < 1) newPrice = 1;

            inMemoryPrices.put(code, newPrice);

            redisTemplate.opsForHash().put("prices", code, newPrice);

            System.out.println("Updating price for: " + code + " -> " + newPrice);

            
// 🔥 AFTER updating all stocks → push to frontend
    Map<Object, Object> prices = redisTemplate.opsForHash().entries("prices");
    messagingTemplate.convertAndSend("/topic/prices", prices);
        }
    }
}

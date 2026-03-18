package com.example.exchanger_service.services;

import java.security.SecureRandom;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Profile;

import com.example.exchanger_service.entities.Stock;
import com.example.exchanger_service.repository.StockRepository;

@Component
@Profile("!test") // ✅ This tells Spring: "Do NOT run this during Unit Tests"
public class StockBatchExchanger implements CommandLineRunner {

    // ✅ Added Logger to fix System.out.println Code Smells
    private static final Logger logger = LoggerFactory.getLogger(StockBatchExchanger.class);
    
    private final StockRepository repository;
    
    // ✅ Replaced Random with SecureRandom to fix the Security Hotspot
    private final SecureRandom random = new SecureRandom();

    public StockBatchExchanger(StockRepository repository) {
        this.repository = repository;
    }

    private double fluctuate(double price) {
        // Fluctuates price by a small percentage
        double changePercent = (random.nextDouble() - 0.5) * 0.1;
        return Math.round(price * (1 + changePercent / 100) * 100.0) / 100.0;
    }

    @Override
    public void run(String... args) throws Exception {
        logger.info("== Starting price simulation loop...");

        // We run this in a loop to simulate live market changes
        for (int i = 1; i <= 5; i++) { 
            List<Stock> stocks = repository.findAll();
            for (Stock stock : stocks) {
                double newPrice = fluctuate(stock.getPrice());
                stock.setPrice(newPrice);
                logger.info("Market Update: {} is now {}", stock.getCode(), newPrice);
            }
            repository.saveAll(stocks);
            logger.info("Iteration {} saved to DB.", i);
            Thread.sleep(2000); // Wait 2 seconds between updates
        }

        logger.info("== Initial Simulation Batch Completed.");
    }
}
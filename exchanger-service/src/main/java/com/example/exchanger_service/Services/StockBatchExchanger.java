package com.example.exchanger_service.Services;

import java.util.List;
import java.util.Random;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.context.annotation.Profile;
import com.example.exchanger_service.Entities.Stock;
import com.example.exchanger_service.Repository.StockRepository;

@Component
@Profile("!test") // ✅ This tells Spring: "Do NOT run this during Unit Tests"
public class StockBatchExchanger implements CommandLineRunner {

    private final StockRepository repository;
    private final Random random = new Random();

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
        System.out.println("== Starting price simulation loop...");

        // We run this in a loop to simulate live market changes
        for (int i = 1; i <= 5; i++) { 
            List<Stock> stocks = repository.findAll();
            for (Stock stock : stocks) {
                double newPrice = fluctuate(stock.getPrice());
                stock.setPrice(newPrice);
                System.out.println("Market Update: " + stock.getCode() + " is now " + newPrice);
            }
            repository.saveAll(stocks);
            System.out.println("Iteration " + i + " saved to DB.");
            Thread.sleep(2000); // Wait 2 seconds between updates
        }

        System.out.println("== Initial Simulation Batch Completed.");
        // ✅ System.exit(0) REMOVED. This keeps your microservice running!
    }
}
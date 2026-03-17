package com.example.exchanger_service.Services;
import java.util.List;
import java.util.Random;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.exchanger_service.Entities.Stock;
import com.example.exchanger_service.Repository.StockRepository;

@Component
public class StockBatchExchanger implements CommandLineRunner {

    private final StockRepository repository;
    private final Random random = new Random();

    public StockBatchExchanger(StockRepository repository) {
        this.repository = repository;
    }

    private double fluctuate(double price) {
        double changePercent = (random.nextDouble() - 0.5) * 0.1;
        return Math.round(price * (1 + changePercent / 100) * 100.0) / 100.0;
    }

    @Override
    public void run(String... args) throws Exception {

        System.out.println("== Starting batch price simulation...");

        List<Stock> stocks = repository.findAll();

        for (int i = 1; i <= 10; i++) {

            for (Stock stock : stocks) {
                double newPrice = fluctuate(stock.getPrice());
                stock.setPrice(newPrice);

                System.out.println(stock.getCode() + " ==> " + newPrice);
            }

            System.out.println("----------------------------");
            Thread.sleep(1000);
        }

        // Save once after 10 runs
        repository.saveAll(stocks);

        System.out.println("== Prices updated in DB.");
        System.out.println("== Batch completed. Shutting down.");

        // Stop application
        System.exit(0);
    }
}
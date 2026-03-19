package com.example.simulation_engine.Services;

import java.time.Duration;
import java.time.LocalTime;
import java.time.ZoneId;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class MarketRunner implements CommandLineRunner {

    private static final LocalTime START = LocalTime.of(8, 30);
    private static final LocalTime END = LocalTime.of(15, 30);
    private static final ZoneId ZONE = ZoneId.of("Asia/Kolkata");

    @Autowired
    private ScheduledExecutorService schedulerExecutor;

    @Autowired
    private PriceService priceService;

    @Override
    public void run(String... args) {

        System.out.println("Current Time: " + LocalTime.now(ZONE));

        if (!isWithinMarketHours()) {
            System.out.println("Market closed. Terminating...");
            System.exit(0);
        }

        System.out.println("Market open. Starting services...");

        // updatePrices → every 1 sec
        schedulerExecutor.scheduleAtFixedRate(
                priceService::updatePrices,
                0,
                1,
                TimeUnit.SECONDS
        );

        // persistPrices → every 30 sec
        schedulerExecutor.scheduleAtFixedRate(
                priceService::persistPrices,
                0,
                30,
                TimeUnit.SECONDS
        );

        // Auto shutdown at market close
        long delay = Duration.between(LocalTime.now(ZONE), END).getSeconds();

        schedulerExecutor.schedule(() -> {
            System.out.println("Market closed. Shutting down...");
            schedulerExecutor.shutdown();
            System.exit(0);
        }, delay, TimeUnit.SECONDS);
    }

    private boolean isWithinMarketHours() {
        LocalTime now = LocalTime.now(ZONE);
        return !now.isBefore(START) && !now.isAfter(END);
    }
}

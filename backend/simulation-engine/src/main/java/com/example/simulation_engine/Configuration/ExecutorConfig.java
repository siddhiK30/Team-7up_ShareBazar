package com.example.simulation_engine.Configuration;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ExecutorConfig {

    @Bean
    public ScheduledExecutorService schedulerExecutor() {
        return Executors.newScheduledThreadPool(2); // 2 schedulers
    }
}
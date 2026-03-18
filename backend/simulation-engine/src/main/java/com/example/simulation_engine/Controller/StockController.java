package com.example.simulation_engine.Controller;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class StockController {

    private final RedisTemplate<String, Object> redisTemplate;
    
    @GetMapping("/prices/live")
    public Object getLivePrices() {
        return redisTemplate.opsForHash().entries("prices");
    }

}

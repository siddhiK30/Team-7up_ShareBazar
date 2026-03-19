package com.example.simulation_engine.Controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.web.bind.annotation.*;

import com.example.simulation_engine.Entities.Stock;
import com.example.simulation_engine.Repositories.StockHistoryRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"})
public class CompanyController {

    @Autowired
    private StockHistoryRepository stockRepository;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    // ✅ Get all companies with live prices
    @GetMapping("/companies")
    public List<Map<String, Object>> getAllCompanies() {
        List<Stock> stocks = stockRepository.findAll();
        List<Map<String, Object>> result = new ArrayList<>();

        for (Stock stock : stocks) {
            Map<String, Object> company = new HashMap<>();
            company.put("id", stock.getId());
            company.put("name", stock.getCompanyName());
            company.put("symbol", stock.getCompanyCode());

            // Get live price from Redis
            Object redisPrice = redisTemplate.opsForHash().get("prices", stock.getCompanyCode());
            double price = redisPrice != null 
                ? Double.parseDouble(redisPrice.toString()) 
                : stock.getFaceValue();

            company.put("price", price);
            company.put("faceValue", stock.getFaceValue());
            company.put("change", 0.0);

            result.add(company);
        }

        return result;
    }
}
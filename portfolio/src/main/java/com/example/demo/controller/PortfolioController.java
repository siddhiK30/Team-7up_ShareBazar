package com.example.demo.controller;

import java.util.List;   // ✅ IMPORTANT
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.Entity.Portfolio;          // ✅ fix package (entity not Entity)
import com.example.demo.service.PortfolioService;
import com.example.demo.dto.HoldingResponse;

@RestController
@RequestMapping("/portfolio")
public class PortfolioController {

    @Autowired
    private PortfolioService service;

    // ✅ Create portfolio
    @PostMapping("/create")
    public Portfolio create(@RequestParam Long userId,
                            @RequestParam String name) {
        return service.createPortfolio(userId, name);
    }

    // ✅ Get user portfolios
    @GetMapping("/user/{userId}")
    public List<Portfolio> getUser(@PathVariable Long userId) {
        return service.getUserPortfolios(userId);
    }

    // ✅ Get holdings
    @GetMapping("/{id}/holdings")
    public List<HoldingResponse> getHoldings(@PathVariable Long id) {
        return service.getHoldings(id);
    }
    @PostMapping("/internal/addStock")
    public void addStock(@RequestBody Map<String, Object> data) {
        service.addStock(
            Long.valueOf(data.get("portfolioId").toString()),
            Long.valueOf(data.get("companyId").toString()),
            Integer.parseInt(data.get("qty").toString()),
            Double.parseDouble(data.get("price").toString())
        );
    }

    @PostMapping("/internal/sellStock")
    public void sellStock(@RequestBody Map<String, Object> data) {
        service.sellStock(
            Long.valueOf(data.get("portfolioId").toString()),
            Long.valueOf(data.get("companyId").toString()),
            Integer.parseInt(data.get("qty").toString())
        );
    }
}
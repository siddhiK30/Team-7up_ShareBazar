package com.example.demo.controller;

import java.util.List;   // ✅ IMPORTANT
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

    // @PostMapping("/internal/sellStock")
    // public void sellStock(@RequestBody Map<String, Object> data) {
    //     service.sellStock(
    //         Long.valueOf(data.get("portfolioId").toString()),
    //         Long.valueOf(data.get("companyId").toString()),
    //         Integer.parseInt(data.get("qty").toString())
    //     );
    // }

    @PostMapping("/internal/sellStock")
public ResponseEntity<?> sellStock(@RequestBody Map<String, Object> data) {
    try {
        System.out.println("=== SELL REQUEST ===");
        System.out.println("Data: " + data);

        Long portfolioId = Long.valueOf(data.get("portfolioId").toString());
        Long companyId = Long.valueOf(data.get("companyId").toString());
        int qty = Integer.parseInt(data.get("qty").toString());

        service.sellStock(portfolioId, companyId, qty);
        return ResponseEntity.ok("Stock sold");

    } catch (Exception e) {
        System.out.println("SELL ERROR: " + e.getMessage());
        e.printStackTrace();
        return ResponseEntity.badRequest().body(e.getMessage());
    }
}
}
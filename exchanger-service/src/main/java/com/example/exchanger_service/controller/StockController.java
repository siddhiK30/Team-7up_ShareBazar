package com.example.exchanger_service.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.exchanger_service.entities.Stock;
import com.example.exchanger_service.services.StockService;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "*")
public class StockController {

    private final StockService service;

    public StockController(StockService service) {
        this.service = service;
    }

    @GetMapping
    public List<Stock> getAllStocks() {
        return service.getAllStocks();
    }
}

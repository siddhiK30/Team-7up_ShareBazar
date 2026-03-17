package com.example.exchanger_service.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.exchanger_service.Entities.Stock;
import com.example.exchanger_service.Repository.StockRepository;

@Service
public class StockService {

    private final StockRepository repository;

    public StockService(StockRepository repository) {
        this.repository = repository;
    }

    public List<Stock> getAllStocks() {
        return repository.findAll();
    }
}
package com.example.exchanger_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.exchanger_service.entities.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Stock findByCode(String code);
}
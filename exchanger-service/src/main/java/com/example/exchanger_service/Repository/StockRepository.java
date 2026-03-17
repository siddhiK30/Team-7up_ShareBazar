package com.example.exchanger_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.exchanger_service.Entities.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Stock findByCode(String code);
}
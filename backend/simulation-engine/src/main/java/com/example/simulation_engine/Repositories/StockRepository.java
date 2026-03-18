package com.example.simulation_engine.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.simulation_engine.Entities.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {}


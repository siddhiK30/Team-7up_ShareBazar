package com.example.simulation_engine.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.simulation_engine.Entities.PriceHistory;

public interface PriceHistoryRepository extends JpaRepository<PriceHistory, Long> {}

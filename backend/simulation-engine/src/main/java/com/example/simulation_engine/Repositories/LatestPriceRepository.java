package com.example.simulation_engine.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.simulation_engine.Entities.LatestPrice;

public interface LatestPriceRepository extends JpaRepository<LatestPrice, Long> {}

package com.example.simulation_engine.Repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.simulation_engine.Entities.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
    
    @Query("SELECT s.companyCode, s.faceValue FROM Stock s WHERE s.isActive = true")
    List<Object[]> findAllFaceValues();
}


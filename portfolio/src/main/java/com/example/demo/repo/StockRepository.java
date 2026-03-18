package com.example.demo.repo;


import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.Entity.Stock;

public interface StockRepository extends JpaRepository<Stock, Long> {
}

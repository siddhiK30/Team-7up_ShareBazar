package com.example.demo.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.LatestPrice;

public interface LatestPriceRepository extends JpaRepository<LatestPrice, Long> {

    List<LatestPrice> findByStockIdIn(List<Long> ids);
}
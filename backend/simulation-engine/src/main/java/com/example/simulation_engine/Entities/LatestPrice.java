package com.example.simulation_engine.Entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="latest_price")
public class LatestPrice {    
    @Id    
    private Long stockId;    
    private double price;    
    private LocalDateTime lastUpdated;
    public LatestPrice() {
    }
    public LatestPrice(Long stockId, double price, LocalDateTime lastUpdated) {
        this.stockId = stockId;
        this.price = price;
        this.lastUpdated = lastUpdated;
    }

    
    
}

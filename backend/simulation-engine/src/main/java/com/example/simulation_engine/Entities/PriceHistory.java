package com.example.simulation_engine.Entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name="price_history")
public class PriceHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long stockId;
    private double price;
    private LocalDateTime timestamp;

    public PriceHistory() {
    }

    public PriceHistory(Long id, Long stockId, double price, LocalDateTime timestamp) {
        this.id = id;
        this.stockId = stockId;
        this.price = price;
        this.timestamp = timestamp;
    }

}
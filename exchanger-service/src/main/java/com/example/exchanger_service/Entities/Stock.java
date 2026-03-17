package com.example.exchanger_service.Entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stocks")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String code;
    private Double price;

    public Stock() {}

    public Stock(Long id, String code, Double price) {
        this.id = id;
        this.code = code;
        this.price = price;
    }

    // --- MANUAL GETTERS AND SETTERS (Fixes the red errors) ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
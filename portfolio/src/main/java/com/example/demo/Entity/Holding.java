package com.example.demo.Entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name = "holding")
public class Holding {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long portfolioId;
    private Long companyId;

    private int quantity;
    private double avgBuyPrice;

    private LocalDateTime updatedAt;

    // ✅ Constructor
    public Holding() {}

    // ✅ Getters & Setters

    public Long getId() {
        return id;
    }

    public Long getPortfolioId() {
        return portfolioId;
    }

    public void setPortfolioId(Long portfolioId) {
        this.portfolioId = portfolioId;
    }

    public Long getCompanyId() {
        return companyId;
    }

    public void setCompanyId(Long companyId) {
        this.companyId = companyId;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public double getAvgBuyPrice() {
        return avgBuyPrice;
    }

    public void setAvgBuyPrice(double avgBuyPrice) {
        this.avgBuyPrice = avgBuyPrice;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
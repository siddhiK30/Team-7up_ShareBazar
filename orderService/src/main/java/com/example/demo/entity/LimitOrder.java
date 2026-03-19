package com.example.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "limit_orders")
public class LimitOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long portfolioId;
    private Long companyId;

    private int quantity;
    private double targetPrice;
    private double currentPrice;
    private String orderType;
    private String status = "PENDING";

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime executedAt;
    private LocalDateTime expiresAt;
    private String failureReason;
    private String companyName; 
    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    // ──── Getters & Setters ────

    public Long getId() { 
        return id; 
    }
    public void setId(Long id) { 
        this.id = id; 
    }

    public Long getUserId() { 
        return userId; 
    }
    public void setUserId(Long userId) { 
        this.userId = userId; 
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

    public double getTargetPrice() { 
        return targetPrice; 
    }
    public void setTargetPrice(double targetPrice) { 
        this.targetPrice = targetPrice; 
    }

    public double getCurrentPrice() { 
        return currentPrice; 
    }
    public void setCurrentPrice(double currentPrice) { 
        this.currentPrice = currentPrice; 
    }

    public String getOrderType() { 
        return orderType; 
    }
    public void setOrderType(String orderType) { 
        this.orderType = orderType; 
    }

    public String getStatus() { 
        return status; 
    }
    public void setStatus(String status) { 
        this.status = status; 
    }

    public LocalDateTime getCreatedAt() { 
        return createdAt; 
    }
    public void setCreatedAt(LocalDateTime createdAt) { 
        this.createdAt = createdAt; 
    }

    public LocalDateTime getExecutedAt() { 
        return executedAt; 
    }
    public void setExecutedAt(LocalDateTime executedAt) { 
        this.executedAt = executedAt; 
    }

    public LocalDateTime getExpiresAt() { 
        return expiresAt; 
    }
    public void setExpiresAt(LocalDateTime expiresAt) { 
        this.expiresAt = expiresAt; 
    }

    public String getFailureReason() { 
        return failureReason; 
    }
    public void setFailureReason(String failureReason) { 
        this.failureReason = failureReason; 
    }

}  // ← Make sure this closing brace exists and there is NOTHING after it
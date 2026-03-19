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
@Table(name = "stock")
public class Stock {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String companyName;
    private String companyCode;
    private double faceValue;
    private boolean isActive;
    private double volatilityFactor;
    private LocalDateTime addedOn;

    public Stock(Long id, String companyName, String companyCode, double faceValue, boolean isActive,
            double volatilityFactor, LocalDateTime addedOn) {
        this.id = id;
        this.companyName = companyName;
        this.companyCode = companyCode;
        this.faceValue = faceValue;
        this.isActive = isActive;
        this.volatilityFactor = volatilityFactor;
        this.addedOn = addedOn;
    }

    public Stock() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyCode() {
        return companyCode;
    }

    public void setCompanyCode(String companyCode) {
        this.companyCode = companyCode;
    }

    public double getFaceValue() {
        return faceValue;
    }

    public void setFaceValue(double faceValue) {
        this.faceValue = faceValue;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean isActive) {
        this.isActive = isActive;
    }

    public double getVolatilityFactor() {
        return volatilityFactor;
    }

    public void setVolatilityFactor(double volatilityFactor) {
        this.volatilityFactor = volatilityFactor;
    }

    public LocalDateTime getAddedOn() {
        return addedOn;
    }

    public void setAddedOn(LocalDateTime addedOn) {
        this.addedOn = addedOn;
    }
    
}

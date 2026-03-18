package com.example.admin_service.dto;

public class CompanyUpdateDTO {
    
    private Integer numberOfStocks;
    private Double stockPrice;

    // --- Empty Constructor ---
    public CompanyUpdateDTO() {
    }

    // --- GETTERS AND SETTERS ---
    public Integer getNumberOfStocks() {
        return numberOfStocks;
    }

    public void setNumberOfStocks(Integer numberOfStocks) {
        this.numberOfStocks = numberOfStocks;
    }

    public Double getStockPrice() {
        return stockPrice;
    }

    public void setStockPrice(Double stockPrice) {
        this.stockPrice = stockPrice;
    }
}
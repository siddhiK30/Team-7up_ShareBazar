package com.example.admin_service.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "companies")
public class Company {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "company_name", nullable = false)
    private String companyName;

    @Column(name = "company_code", nullable = false, unique = true)
    private String companyCode;

    @Column(name = "number_of_stocks", nullable = false)
    private Integer numberOfStocks;
    @Column(name = "stock_price", nullable = false)
private double stockPrice;

public double getStockPrice() {
    return stockPrice;
}

public void setStockPrice(double stockPrice) {
    this.stockPrice = stockPrice;
}

    public Company() {}

    public Long getId() { return id; }

    public String getCompanyName() { return companyName; }
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyCode() { return companyCode; }
    public void setCompanyCode(String companyCode) { this.companyCode = companyCode; }

    public Integer getNumberOfStocks() { return numberOfStocks; }
    public void setNumberOfStocks(Integer numberOfStocks) { this.numberOfStocks = numberOfStocks; }
}
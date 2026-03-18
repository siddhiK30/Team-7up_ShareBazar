package com.example.demo.dto;

public class HoldingResponse {
    private Long companyId;
    private String companyName;       // ✅ ADD
    private String companyCode;       // ✅ ADD
    private Integer quantity;
    private Double avgBuyPrice;
    private Double currentPrice;
    private Double profitLoss;
    private Double profitLossPercent;

    public HoldingResponse() {}

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }

    public String getCompanyName() { return companyName; }          // ✅ ADD
    public void setCompanyName(String companyName) { this.companyName = companyName; }

    public String getCompanyCode() { return companyCode; }          // ✅ ADD
    public void setCompanyCode(String companyCode) { this.companyCode = companyCode; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public Double getAvgBuyPrice() { return avgBuyPrice; }
    public void setAvgBuyPrice(Double avgBuyPrice) { this.avgBuyPrice = avgBuyPrice; }

    public Double getCurrentPrice() { return currentPrice; }
    public void setCurrentPrice(Double currentPrice) { this.currentPrice = currentPrice; }

    public Double getProfitLoss() { return profitLoss; }
    public void setProfitLoss(Double profitLoss) { this.profitLoss = profitLoss; }

    public Double getProfitLossPercent() { return profitLossPercent; }
    public void setProfitLossPercent(Double profitLossPercent) { this.profitLossPercent = profitLossPercent; }
}
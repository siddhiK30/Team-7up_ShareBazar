package com.example.demo.dto;

public class HoldingResponse {

    public Long companyId;
    public int quantity;
    public double avgBuyPrice;
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
	public double getCurrentPrice() {
		return currentPrice;
	}
	public void setCurrentPrice(double currentPrice) {
		this.currentPrice = currentPrice;
	}
	public double getProfitLoss() {
		return profitLoss;
	}
	public void setProfitLoss(double profitLoss) {
		this.profitLoss = profitLoss;
	}
	public double getProfitLossPercent() {
		return profitLossPercent;
	}
	public void setProfitLossPercent(double profitLossPercent) {
		this.profitLossPercent = profitLossPercent;
	}
	public double currentPrice;

    public double profitLoss;
    public double profitLossPercent;
}
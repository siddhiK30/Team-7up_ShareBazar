package com.example.demo.dto;

public class OrderRequest {

    private Long userId;
    private Long portfolioId;
    private Long companyId;

    private int quantity;
    private double price;
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
	public double getPrice() {
		return price;
	}
	public void setPrice(double price) {
		this.price = price;
	}

    // getters & setters
}
package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
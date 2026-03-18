package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.OrderRequest;
import com.example.demo.entity.Order;
import com.example.demo.service.OrderService;

@RestController
@RequestMapping("/orders")

public class OrderController {

    @Autowired
    private OrderService service;

    @PostMapping("/buy")
    public Order buy(@RequestBody OrderRequest req) {
        return service.buy(req);
    }

    @PostMapping("/sell")
    public Order sell(@RequestBody OrderRequest req) {
        return service.sell(req);
    }
}
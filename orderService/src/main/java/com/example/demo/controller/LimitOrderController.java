// controller/LimitOrderController.java
package com.example.demo.controller;

import com.example.demo.dto.LimitOrderRequest;
import com.example.demo.entity.LimitOrder;
import com.example.demo.service.LimitOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders/limit")
@CrossOrigin(origins = "*")
public class LimitOrderController {

    @Autowired
    private LimitOrderService limitOrderService;

    // Place a new limit order
    @PostMapping("/place")
    public ResponseEntity<LimitOrder> placeLimitOrder(
        @RequestBody LimitOrderRequest req
    ) {
        LimitOrder lo = limitOrderService.placeLimitOrder(req);
        return ResponseEntity.ok(lo);
    }

    // Cancel a pending limit order
    @PutMapping("/cancel/{id}")
    public ResponseEntity<LimitOrder> cancelLimitOrder(
        @PathVariable Long id,
        @RequestParam Long userId
    ) {
        LimitOrder lo = limitOrderService.cancelLimitOrder(id, userId);
        return ResponseEntity.ok(lo);
    }

    // Get all limit orders for a user
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<LimitOrder>> getUserLimitOrders(
        @PathVariable Long userId
    ) {
        return ResponseEntity.ok(limitOrderService.getUserLimitOrders(userId));
    }
}
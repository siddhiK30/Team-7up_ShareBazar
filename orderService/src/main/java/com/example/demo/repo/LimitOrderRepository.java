
// repo/LimitOrderRepository.java
package com.example.demo.repo;

import com.example.demo.entity.LimitOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDateTime;
import java.util.List;

public interface LimitOrderRepository extends JpaRepository<LimitOrder, Long> {

    // All PENDING orders for the scheduler
    List<LimitOrder> findByStatus(String status);

    // User's limit orders (all)
    List<LimitOrder> findByUserIdOrderByCreatedAtDesc(Long userId);

    // User's PENDING limit orders only
    List<LimitOrder> findByUserIdAndStatus(Long userId, String status);

    // Expired PENDING orders
    @Query("SELECT l FROM LimitOrder l WHERE l.status = 'PENDING' " +
           "AND l.expiresAt IS NOT NULL AND l.expiresAt < :now")
    List<LimitOrder> findExpiredOrders(LocalDateTime now);
}
package com.example.wallet_service.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

import com.example.wallet_service.Entities.Wallet;

import jakarta.persistence.LockModeType;

public interface WalletRepository extends JpaRepository<Wallet, String> {

    Optional<Wallet> findByUserId(String userId);
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT w FROM Wallet w WHERE w.userId = :userId")
    Optional<Wallet> findByUserIdForUpdate(String userId);
}

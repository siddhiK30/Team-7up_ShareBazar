package com.example.wallet_service.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.wallet_service.Entities.Transactions;

public interface TransactionRepository extends JpaRepository<Transactions, String> {
    List<Transactions> findByWalletId(String walletId);  // ✅ ADD THIS
}
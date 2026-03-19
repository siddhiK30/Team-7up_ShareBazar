package com.example.wallet_service.Services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.wallet_service.Entities.Transactions;
import com.example.wallet_service.Entities.Wallet;
import com.example.wallet_service.Repository.TransactionRepository;
import com.example.wallet_service.Repository.WalletRepository;

import jakarta.transaction.Transactional;

@Service
public class WalletService {

    @Autowired
    private WalletRepository walletRepository;

    @Autowired
    private TransactionRepository txnRepository;

    // ✅ FIXED: Create wallet properly
    public Wallet createWallet(String userId) {
        // Check if wallet already exists
        Optional<Wallet> existing = walletRepository.findByUserId(userId);
        if (existing.isPresent()) {
            return existing.get();
        }

        Wallet w = new Wallet();
        w.setId(UUID.randomUUID().toString());   // ✅ Random unique ID
        w.setUserId(userId);                      // ✅ Actual userId
        w.setBalance(BigDecimal.valueOf(100)); // ✅ Starting balance
        w.setMinBalance(BigDecimal.valueOf(100));
        return walletRepository.save(w);
    }

    // ✅ NEW: Get wallet by userId
    public Optional<Wallet> getWallet(String userId) {
        return walletRepository.findByUserId(userId);
    }

    // ✅ NEW: Get transactions by userId
    public List<Transactions> getTransactions(String userId) {
        Optional<Wallet> wallet = walletRepository.findByUserId(userId);
        if (wallet.isEmpty()) {
            return List.of();
        }
        return txnRepository.findByWalletId(wallet.get().getId());
    }

    @Transactional
    public String credit(String userId, BigDecimal amount) {
        Optional<Wallet> optionalWallet = walletRepository.findByUserIdForUpdate(userId);

        if (optionalWallet.isEmpty()) {
            return "Wallet not found";
        }

        Wallet wallet = optionalWallet.get();
        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);

        saveTxn(wallet.getId(), amount, "CREDIT", "SUCCESS");
        return "Amount credited successfully";
    }

    @Transactional
    public String debit(String userId, BigDecimal amount) {
        Optional<Wallet> optionalWallet = walletRepository.findByUserIdForUpdate(userId);

        if (optionalWallet.isEmpty()) {
            return "Wallet not found";
        }

        Wallet wallet = optionalWallet.get();
        BigDecimal newBalance = wallet.getBalance().subtract(amount);

        if (newBalance.compareTo(wallet.getMinBalance()) < 0) {
            saveTxn(wallet.getId(), amount, "DEBIT", "FAILED");
            return "Insufficient balance or minimum balance violation";
        }

        wallet.setBalance(newBalance);
        walletRepository.save(wallet);

        saveTxn(wallet.getId(), amount, "DEBIT", "SUCCESS");
        return "Amount debited successfully";
    }

    // ✅ FIXED: Use UUID for transaction ID
    private void saveTxn(String walletId, BigDecimal amount, String type, String status) {
        Transactions txn = new Transactions();
        txn.setId(UUID.randomUUID().toString());  // ✅ Unique ID
        txn.setWalletId(walletId);
        txn.setAmount(amount);
        txn.setType(type);
        txn.setStatus(status);
        txnRepository.save(txn);
    }
}
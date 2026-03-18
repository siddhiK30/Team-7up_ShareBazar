package com.example.wallet_service.Services;

import java.math.BigDecimal;
import java.util.Optional;

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

    @Transactional
    public String credit(String userId, BigDecimal amount) {
        Optional<Wallet> optionalWallet = walletRepository.findByUserIdForUpdate(userId);

        if (optionalWallet.isEmpty()) {
            return "Wallet not found";
        }

        Wallet wallet = optionalWallet.get();

        wallet.setBalance(wallet.getBalance().add(amount));
        walletRepository.save(wallet);

        saveTxn(userId, wallet.getId(), amount, "CREDIT", "SUCCESS");

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
            saveTxn(userId, wallet.getId(), amount, "DEBIT", "FAILED");
            return "Insufficient balance or minimum balance violation";
        }
    
        wallet.setBalance(newBalance);
        walletRepository.save(wallet);
    
        saveTxn(userId, wallet.getId(), amount, "DEBIT", "SUCCESS");
    
        return "Amount debited successfully";
    }

    private void saveTxn(String userId, String walletId, BigDecimal amount, String type, String status) {
        Transactions txn = new Transactions();
        txn.setId(userId);
        txn.setWalletId(walletId);
        txn.setAmount(amount);
        txn.setType(type);
        txn.setStatus(status);

        txnRepository.save(txn);
    }
}

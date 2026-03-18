package com.example.wallet_service.Controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.wallet_service.Entities.Transactions;
import com.example.wallet_service.Entities.Wallet;
import com.example.wallet_service.Services.WalletService;

@RestController
@RequestMapping("/wallet")
@CrossOrigin(origins = "*")
public class WalletController {

    @Autowired
    private WalletService walletService;

    // ✅ Create wallet
    @PostMapping("/create")
    public ResponseEntity<?> createWallet(@RequestBody Map<String, Object> request) {
        String userId = request.get("userId").toString();
        Wallet wallet = walletService.createWallet(userId);
        return ResponseEntity.ok(wallet);
    }

    // ✅ Get wallet by userId
    @GetMapping("/{userId}")
    public ResponseEntity<?> getWallet(@PathVariable String userId) {
        return walletService.getWallet(userId)
            .map(wallet -> {
                Map<String, Object> response = new HashMap<>();
                response.put("userId", wallet.getUserId());
                response.put("balance", wallet.getBalance());
                response.put("minBalance", wallet.getMinBalance());
                response.put("id", wallet.getId());
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get balance only
    @GetMapping("/balance/{userId}")
    public ResponseEntity<?> getBalance(@PathVariable String userId) {
        return walletService.getWallet(userId)
            .map(wallet -> {
                Map<String, Object> response = new HashMap<>();
                response.put("userId", wallet.getUserId());
                response.put("balance", wallet.getBalance());
                return ResponseEntity.ok(response);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Credit
    @PostMapping("/credit")
    public ResponseEntity<String> credit(@RequestBody Map<String, Object> request) {
        String userId = request.get("userId").toString();
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String result = walletService.credit(userId, amount);

        if (result.contains("success")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(404).body(result);
    }

    // ✅ Debit
    @PostMapping("/debit")
    public ResponseEntity<String> debit(@RequestBody Map<String, Object> request) {
        String userId = request.get("userId").toString();
        BigDecimal amount = new BigDecimal(request.get("amount").toString());
        String result = walletService.debit(userId, amount);

        if (result.contains("success")) {
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(400).body(result);
    }

    // ✅ Get transactions
    @GetMapping("/transactions/{userId}")
    public ResponseEntity<List<Transactions>> getTransactions(@PathVariable String userId) {
        return ResponseEntity.ok(walletService.getTransactions(userId));
    }
}
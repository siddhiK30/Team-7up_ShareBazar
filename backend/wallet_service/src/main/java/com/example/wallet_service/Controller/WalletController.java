package com.example.wallet_service.Controller;

import java.math.BigDecimal;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.wallet_service.Services.WalletService;

@RestController
@RequestMapping("/wallet")
public class WalletController {

    @Autowired
    private WalletService walletService;

    @PostMapping("/credit")
    public ResponseEntity<String> credit(@RequestBody Map<String, Object> body) {

        String userId = body.get("userId").toString();
        BigDecimal amount = new BigDecimal(body.get("amount").toString());

        String response = walletService.credit(userId, amount);

        switch(response) {
            case "Amount credited successfully":
                return ResponseEntity.ok(response);
            case "Wallet not found":
                return ResponseEntity.status(404).body(response);
            default:
                return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/debit")
    public ResponseEntity<String> debit(@RequestBody Map<String, Object> body) {

        String userId = body.get("userId").toString();
        BigDecimal amount = new BigDecimal(body.get("amount").toString());

        String response = walletService.debit(userId, amount);

        switch(response) {
            case "Amount debited successfully":
                return ResponseEntity.ok(response);
            case "Wallet not found":
                return ResponseEntity.status(404).body(response);
            case "Insufficient balance or minimum balance violation":
                return ResponseEntity.badRequest().body(response);
            default:
                return ResponseEntity.badRequest().body(response);
        }
    }
}

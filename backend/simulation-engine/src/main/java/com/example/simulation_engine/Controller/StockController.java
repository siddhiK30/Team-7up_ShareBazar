package com.example.simulation_engine.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.simulation_engine.Repositories.StockHistoryRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class StockController {

    private final RedisTemplate<String, Object> redisTemplate;
    @Autowired private StockHistoryRepository companyrepo;
    
    @GetMapping("/prices/live")
    public Object getLivePrices() {
        return redisTemplate.opsForHash().entries("prices");
    }

    @GetMapping("/prices/live/{code}")
    public ResponseEntity<Map<String, Object>> getLivePrice(@PathVariable String code) {
        Object price = redisTemplate.opsForHash().get("prices", code);

        if (price == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Stock not found");
        }

        Map<String, Object> response = new HashMap<>();
        response.put("code", code);
        response.put("price", Double.parseDouble(price.toString()));

        return ResponseEntity.ok(response);
    }

   @GetMapping("/prices/face-values")
public Map<String, Double> getFaceValues() {

    List<Object[]> rows = companyrepo.findAllFaceValues();

    Map<String, Double> response = new HashMap<>();

    for (Object[] row : rows) {
        String code = (String) row[0];
        Double faceValue = ((Number) row[1]).doubleValue();

        response.put(code, faceValue);
    }

    return response;
}

}

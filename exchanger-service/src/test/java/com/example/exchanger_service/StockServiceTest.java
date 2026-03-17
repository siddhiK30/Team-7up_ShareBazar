package com.example.exchanger_service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.exchanger_service.Entities.Stock;
import com.example.exchanger_service.Repository.StockRepository;
import com.example.exchanger_service.Services.StockService;

@ExtendWith(MockitoExtension.class)
class StockServiceTest {

    @Mock
    private StockRepository repository;

    @InjectMocks
    private StockService service;

    @Test
    void shouldGetAllStocks() {
        // GIVEN: Mock the database returning 2 stocks
        List<Stock> mockList = Arrays.asList(new Stock(), new Stock());
        when(repository.findAll()).thenReturn(mockList);

        // WHEN: We call the service
        List<Stock> result = service.getAllStocks();

        // THEN: Ensure we get exactly 2 stocks back
        assertEquals(2, result.size());
        verify(repository, times(1)).findAll();
    }
}
package com.example.exchanger_service;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.example.exchanger_service.Controller.StockController;
import com.example.exchanger_service.Entities.Stock;
import com.example.exchanger_service.Services.StockService;

@WebMvcTest(StockController.class)
class StockControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private StockService service;

    @Test
    void shouldGetAllStocks() throws Exception {
        // GIVEN: The service returns a list of 2 fake stocks
        when(service.getAllStocks()).thenReturn(Arrays.asList(new Stock(), new Stock()));

        // WHEN & THEN: Perform GET request and expect HTTP 200 OK
        mockMvc.perform(get("/api/stocks"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }
}
package com.example.admin_service;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import com.example.admin_service.controller.CompanyController;
import com.example.admin_service.dto.CompanyUpdateDTO;
import com.example.admin_service.models.Company;
import com.example.admin_service.services.CompanyService;

@WebMvcTest(CompanyController.class)
class CompanyControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CompanyService service;

    // ✅ TEST 1 — POST /companies
    @Test
    void shouldAddCompany() throws Exception {
        String companyJson = """
                {
                  "name": "Wissen Technology",
                  "numberOfStocks": 100,
                  "stockPrice": 50.0
                }
                """;

        when(service.saveCompany(any(Company.class))).thenReturn(new Company());

        mockMvc.perform(post("/companies")
                .contentType(MediaType.APPLICATION_JSON)
                .content(companyJson))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
    }

    // ✅ TEST 2 — GET /companies
    @Test
    void shouldGetCompanies() throws Exception {
        when(service.getAllCompanies()).thenReturn(Arrays.asList(new Company(), new Company()));

        mockMvc.perform(get("/companies"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2));
    }

    
    @Test
    void shouldDeleteCompany() throws Exception {
        doNothing().when(service).deleteCompany(1L);

        mockMvc.perform(delete("/companies/1"))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk())
                .andExpect(content().string("Company deleted successfully"));
    }

    
    @Test
    void shouldUpdateCompanyPartial() throws Exception {
        String dtoUpdateJson = """
                {
                  "numberOfStocks": 500,
                  "stockPrice": 150.5
                }
                """;

        Company updatedCompany = new Company();
        // Simulating the backend successfully updating the values
        updatedCompany.setNumberOfStocks(500);
        updatedCompany.setStockPrice(150.5);

        when(service.updateCompanyPartial(eq(1L), any(CompanyUpdateDTO.class))).thenReturn(updatedCompany);

        mockMvc.perform(patch("/companies/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(dtoUpdateJson))
                .andDo(MockMvcResultHandlers.print())
                .andExpect(status().isOk());
    }
}
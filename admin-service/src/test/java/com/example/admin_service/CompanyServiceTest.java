package com.example.admin_service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.example.admin_service.dto.CompanyUpdateDTO;
import com.example.admin_service.models.Company;
import com.example.admin_service.repository.CompanyRepository;
import com.example.admin_service.services.CompanyService;

@ExtendWith(MockitoExtension.class)
class CompanyServiceTest {

    @Mock
    private CompanyRepository repository;

    @InjectMocks
    private CompanyService service;

    // ✅ TEST 1 — Save Company
    @Test
    void shouldSaveCompany() {
        Company company = new Company();
        
        when(repository.save(any(Company.class))).thenReturn(company);

        Company savedCompany = service.saveCompany(company);

        assertNotNull(savedCompany);
        verify(repository, times(1)).save(company);
    }

    // ✅ TEST 2 — Get All Companies
    @Test
    void shouldGetAllCompanies() {
        List<Company> mockList = Arrays.asList(new Company(), new Company());
        
        when(repository.findAll()).thenReturn(mockList);

        List<Company> result = service.getAllCompanies();

        assertEquals(2, result.size());
        verify(repository, times(1)).findAll();
    }

    // ✅ TEST 3 — Delete Company
    @Test
    void shouldDeleteCompany() {
        Long companyId = 1L;
        
        // Action (Deleting returns nothing, so we just call it)
        service.deleteCompany(companyId);

        // Verify that the repository's delete method was triggered
        verify(repository, times(1)).deleteById(companyId);
    }

    // ✅ TEST 4 — Partial Update Success
    @Test
    void shouldUpdateCompanyPartial_Success() {
        Long companyId = 1L;
        
        // Mock existing DB data
        Company existingCompany = new Company();
        existingCompany.setNumberOfStocks(100);
        existingCompany.setStockPrice(50.0);

        // Mock the incoming update request
        CompanyUpdateDTO dto = new CompanyUpdateDTO();
        dto.setNumberOfStocks(200);
        dto.setStockPrice(75.5);

        when(repository.findById(companyId)).thenReturn(Optional.of(existingCompany));
        when(repository.save(any(Company.class))).thenReturn(existingCompany);

        Company updatedCompany = service.updateCompanyPartial(companyId, dto);

        // Verify the fields were updated correctly
        assertEquals(200, updatedCompany.getNumberOfStocks());
        assertEquals(75.5, updatedCompany.getStockPrice());
        verify(repository, times(1)).save(existingCompany);
    }

    // ✅ TEST 5 — Partial Update Fails (Company Not Found)
    @Test
    void shouldThrowExceptionWhenUpdatingNonExistentCompany() {
        Long companyId = 99L;
        CompanyUpdateDTO dto = new CompanyUpdateDTO();

        when(repository.findById(companyId)).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> {
            service.updateCompanyPartial(companyId, dto);
        });

        assertEquals("Company not found", exception.getMessage());
        verify(repository, never()).save(any(Company.class));
    }
}
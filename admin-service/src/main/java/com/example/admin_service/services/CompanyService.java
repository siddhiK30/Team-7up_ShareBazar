package com.example.admin_service.services;


import java.util.List;

import org.springframework.stereotype.Service;

import com.example.admin_service.dto.CompanyUpdateDTO;
import com.example.admin_service.models.Company;
import com.example.admin_service.repository.CompanyRepository;

@Service
public class CompanyService {

    private final CompanyRepository repository;

    public CompanyService(CompanyRepository repository) {
        this.repository = repository;
    }

    public Company saveCompany(Company company) {
        return repository.save(company);
    }

    public List<Company> getAllCompanies() {
        return repository.findAll();
    }
       public void deleteCompany(Long id) {
        repository.deleteById(id);
    }

    // ✅ PARTIAL UPDATE (ONLY STOCK + PRICE)
    public Company updateCompanyPartial(Long id, CompanyUpdateDTO dto) {
        Company existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

        if (dto.getNumberOfStocks() != null) {
            existing.setNumberOfStocks(dto.getNumberOfStocks());
        }

        if (dto.getStockPrice() != null) {
            existing.setStockPrice(dto.getStockPrice());
        }

        return repository.save(existing);
    }
}

package com.example.admin_service.services;


import java.util.List;

import org.springframework.stereotype.Service;

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
}

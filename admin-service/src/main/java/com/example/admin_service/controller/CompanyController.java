package com.example.admin_service.controller;



import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.admin_service.models.Company;
import com.example.admin_service.services.CompanyService;

@RestController
@RequestMapping("/companies")
public class CompanyController {

    private final CompanyService service;

    public CompanyController(CompanyService service) {
        this.service = service;
    }

    @PostMapping
    public Company addCompany(@RequestBody Company company) {
        return service.saveCompany(company);
    }

    @GetMapping
    public List<Company> getCompanies() {
        return service.getAllCompanies();
    }
}
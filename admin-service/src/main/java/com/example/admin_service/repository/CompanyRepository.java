package com.example.admin_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.admin_service.models.Company;

public interface CompanyRepository extends JpaRepository<Company, Long> {

}

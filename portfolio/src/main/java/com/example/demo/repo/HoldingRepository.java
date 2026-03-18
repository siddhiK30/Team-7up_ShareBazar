package com.example.demo.repo;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.Entity.Holding;

public interface HoldingRepository extends JpaRepository<Holding, Long> {

    List<Holding> findByPortfolioId(Long portfolioId);

    Optional<Holding> findByPortfolioIdAndCompanyId(Long portfolioId, Long companyId);
}
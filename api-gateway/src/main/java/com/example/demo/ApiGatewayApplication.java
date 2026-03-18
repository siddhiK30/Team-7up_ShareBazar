package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;

@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
    }

    @Bean
    public RouteLocator customRoutes(RouteLocatorBuilder builder) {
        return builder.routes()

                // 🔐 Auth Service Route (FIXED ✅)
                .route("auth_service", r -> r
                        .path("/api/auth/**")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.POST, HttpMethod.OPTIONS)
                        // ❌ removed rewritePath
                        .uri("http://localhost:8082")
                )

                // 🏢 Company Service Route
                .route("company_service", r -> r
                        .path("/companies/**")
                        .and()
                        .method(HttpMethod.GET, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH)
                        .uri("http://localhost:8082")
                )

                .build();
    }
}
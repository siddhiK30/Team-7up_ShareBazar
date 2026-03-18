package com.example.demo; // Make sure this matches your folder path!

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.boot.SpringApplication;
import org.mockito.MockedStatic;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(
    classes = ApiGatewayApplication.class, 
    properties = {
        "eureka.client.enabled=false",
        "spring.cloud.discovery.enabled=false"
    }
)
class ApiGatewayApplicationTests {

    @Autowired
    private ApplicationContext applicationContext;

    @Test
    void contextLoads() {
        // ✅ 1. Tests if the Spring Context (and CorsConfig) loads successfully
        assertNotNull(applicationContext, "The application context should load successfully");
    }

    @Test
    void mainMethodTest() {
        // ✅ 2. The Pro-Trick: We "mock" the run process so it gets 100% coverage 
        // without actually trying to start the WebFlux server!
        try (MockedStatic<SpringApplication> mocked = Mockito.mockStatic(SpringApplication.class)) {
            mocked.when(() -> SpringApplication.run(ApiGatewayApplication.class, new String[]{}))
                  .thenReturn(null);
            
            ApiGatewayApplication.main(new String[]{});
            
            mocked.verify(() -> SpringApplication.run(ApiGatewayApplication.class, new String[]{}));
        }
    }
}
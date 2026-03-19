TECH STACK

Frontend:
React.js (Vite) for building the user interface
JavaScript (ES6+) for application logic
React Router for navigation
Axios for API communication
CSS for styling
WebSocket  for real-time updates

Backend (Microservices):
Spring Boot for backend services
Spring Security for authentication and authorization
JWT (JSON Web Token) for secure login
Spring Data JPA (Hibernate) for database operations

Microservices Architecture:
Eureka Server for service discovery
API Gateway (Spring Cloud Gateway) for centralized routing
Independent services:
Auth Service, Admin Service, Stock/Portfolio Service, Notification Service

Real-Time & Concurrency:
WebSocket for real-time communication (live stock updates, notifications)
Executor Service for multithreading and background task execution

Caching & Performance:
Redis for caching frequently accessed data
Improves performance and enables near real-time updates

Database:
PostgreSQL as the primary relational database
pgAdmin / Supabase for database management

Testing & Code Quality:
SonarQube for static code analysis and code quality monitoring
Used to detect bugs, vulnerabilities, and maintain clean code standards

Tools & Development:
Maven for build and dependency management
Git & GitHub for version control
Postman for API testing
Vite as frontend build tool

Authentication & Security:
JWT-based authentication
Role-based access control (Admin/User)

SERVICES & PORT CONFIGURATION

Eureka Server:
Port: 8761
Purpose: Service registry for all microservices

API Gateway:
Port: 8080
Purpose: Central entry point for routing all client requests

Auth Service (shareBazarBackend):
Port: 8081
Purpose: Handles user authentication, login, and JWT token generation

Admin Service:
Port: 8082
Purpose: Manage companies and admin-level operations

Simulation Engine Service:
Port: 8083
Purpose: Handles stock price simulation and real-time updates

Wallet Service:
Port: 8084
Purpose: Manages user balance, transactions, and wallet operations

Portfolio Service:
Port: 8085
Purpose: Tracks user investments and portfolio data

Order Service:
Port: 8086
Purpose: Handles buy/sell orders and trade execution

Frontend (React - Vite):
Port: 5173
Purpose: User interface


User Action → Frontend (5173) → API Gateway (8080) →
→ Auth / Order / Portfolio / Wallet / Admin Services

Simulation Engine (8083) → Updates prices →
→ Redis Cache → WebSocket → Frontend (real-time updates)


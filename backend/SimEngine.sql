CREATE TABLE stocks (
    id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    company_code VARCHAR(20) UNIQUE NOT NULL,
    face_value DOUBLE PRECISION,
    volatility_factor DOUBLE PRECISION,
    is_active BOOLEAN DEFAULT true,
    added_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE latest_price (
    stock_id BIGINT PRIMARY KEY,
    price DOUBLE PRECISION,
    last_updated TIMESTAMP,
    CONSTRAINT fk_stock
        FOREIGN KEY(stock_id)
        REFERENCES stocks(id)
        ON DELETE CASCADE
);

CREATE TABLE price_history (
    id SERIAL PRIMARY KEY,
    stock_id BIGINT,
    price DOUBLE PRECISION,
    timestamp TIMESTAMP,
    CONSTRAINT fk_stock_history
        FOREIGN KEY(stock_id)
        REFERENCES stocks(id)
        ON DELETE CASCADE
);

CREATE INDEX idx_stock_time ON price_history(stock_id, timestamp DESC);

INSERT INTO stocks (company_name, company_code, face_value, volatility_factor, is_active)
VALUES
('Tata Consultancy Services', 'TCS', 3500, 0.8, true),
('Infosys Limited', 'INFY', 1500, 1.2, true);

INSERT INTO latest_price (stock_id, price, last_updated)
SELECT id, face_value, NOW()
FROM stocks;

SELECT * FROM latest_price;
SELECT * FROM stocks;
SELECT * FROM price_history;

ALTER TABLE stocks RENAME TO stock;
SELECT * FROM stock;

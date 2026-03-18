CREATE TABLE wallet (
    id TEXT PRIMARY KEY,
    user_id TEXT UNIQUE NOT NULL,
    balance NUMERIC(15,2) NOT NULL DEFAULT 0,
    min_balance NUMERIC(15,2) NOT NULL DEFAULT 100, -- minimum required balance
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id TEXT PRIMARY KEY,
    wallet_id TEXT NOT NULL,
    amount NUMERIC(15,2) NOT NULL,
    type VARCHAR(20) NOT NULL, -- CREDIT / DEBIT
    status VARCHAR(20) NOT NULL, -- SUCCESS / FAILED
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_wallet FOREIGN KEY(wallet_id) REFERENCES wallet(id)
);

DROP TABLE wallet;
DROP TABLE transactions;

-- Wallets for 3 users
INSERT INTO wallet (id, user_id, balance, min_balance)
VALUES
('111', 'test1', 10000.00, 100.00),
('222', 'test2', 500.00, 100.00),
('333', 'test3', 150.00, 100.00);

INSERT INTO transactions (id, wallet_id, amount, type, status)
VALUES
('t1', '111', 5000.00, 'CREDIT', 'SUCCESS'),
('t2', '222', 200.00, 'DEBIT', 'SUCCESS'),
('t3', '333', 100.00, 'DEBIT', 'FAILED');

SELECT * FROM wallet;
SELECT * FROM transactions;
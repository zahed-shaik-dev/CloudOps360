CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    environment VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL,
    version VARCHAR(50) NOT NULL,
    uptime VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO services
    (name, environment, status, version, uptime)
VALUES
    ('Frontend', 'development', 'healthy', '1.0.0', '99.95%'),
    ('Backend API', 'development', 'healthy', '1.0.0', '99.98%'),
    ('PostgreSQL', 'development', 'healthy', '16', '99.99%'),
    ('Redis', 'development', 'healthy', '7', '99.97%');
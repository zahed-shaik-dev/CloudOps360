-- ============================================================
-- CloudOps360 Database Initialization
-- ============================================================

-- ------------------------------------------------------------
-- SERVICES
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    environment VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL,
    version VARCHAR(50) NOT NULL,
    uptime VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- DEPLOYMENTS
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS deployments (
    id SERIAL PRIMARY KEY,
    service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
    service_name VARCHAR(100) NOT NULL,
    environment VARCHAR(50) NOT NULL,
    version VARCHAR(50) NOT NULL,
    status VARCHAR(30) NOT NULL,
    branch VARCHAR(100),
    commit_hash VARCHAR(100),
    deployed_by VARCHAR(100),
    deployed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
-- INCIDENTS
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS incidents (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    severity VARCHAR(30) NOT NULL,
    status VARCHAR(30) NOT NULL,
    service_name VARCHAR(100),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP
);

-- ------------------------------------------------------------
-- METRICS
-- ------------------------------------------------------------

CREATE TABLE IF NOT EXISTS metrics (
    id SERIAL PRIMARY KEY,
    service_name VARCHAR(100) NOT NULL,
    cpu_usage NUMERIC(5,2) DEFAULT 0,
    memory_usage NUMERIC(5,2) DEFAULT 0,
    response_time NUMERIC(10,2) DEFAULT 0,
    requests_per_minute INTEGER DEFAULT 0,
    recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- SERVICES DATA
-- ============================================================

INSERT INTO services
    (name, environment, status, version, uptime)
SELECT *
FROM (
    VALUES
        ('Frontend', 'production', 'healthy', '1.0.0', '99.95%'),
        ('Backend API', 'production', 'healthy', '1.0.0', '99.98%'),
        ('PostgreSQL', 'production', 'healthy', '16', '99.99%'),
        ('Redis', 'production', 'healthy', '7', '99.97%')
) AS new_services(name, environment, status, version, uptime)
WHERE NOT EXISTS (
    SELECT 1
    FROM services
    WHERE services.name = new_services.name
);

-- ============================================================
-- DEPLOYMENT DATA
-- ============================================================

INSERT INTO deployments
    (
        service_id,
        service_name,
        environment,
        version,
        status,
        branch,
        commit_hash,
        deployed_by
    )
SELECT
    s.id,
    s.name,
    'production',
    s.version,
    'successful',
    'main',
    'initial',
    'CloudOps360'
FROM services s
WHERE NOT EXISTS (
    SELECT 1
    FROM deployments d
    WHERE d.service_name = s.name
);

-- ============================================================
-- INCIDENT DATA
-- ============================================================

INSERT INTO incidents
    (
        title,
        severity,
        status,
        service_name,
        description
    )
SELECT
    'No active incidents',
    'info',
    'resolved',
    'CloudOps360',
    'All monitored services are operating normally.'
WHERE NOT EXISTS (
    SELECT 1
    FROM incidents
);

-- ============================================================
-- METRIC DATA
-- ============================================================

INSERT INTO metrics
    (
        service_name,
        cpu_usage,
        memory_usage,
        response_time,
        requests_per_minute
    )
SELECT
    service_name,
    cpu_usage,
    memory_usage,
    response_time,
    requests_per_minute
FROM (
    VALUES
        ('Frontend', 22.40, 38.20, 82.00, 145),
        ('Backend API', 31.70, 46.50, 118.00, 126),
        ('PostgreSQL', 18.30, 52.10, 9.00, 94),
        ('Redis', 12.80, 29.40, 4.00, 210)
) AS new_metrics(
    service_name,
    cpu_usage,
    memory_usage,
    response_time,
    requests_per_minute
)
WHERE NOT EXISTS (
    SELECT 1
    FROM metrics m
    WHERE m.service_name = new_metrics.service_name
);
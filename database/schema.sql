-- Base de datos para Rectores USAC 350 Años
-- Ejecutar: mysql -u root -p < database/schema.sql

CREATE DATABASE IF NOT EXISTS rectores_usac CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE rectores_usac;

-- Tabla de likes
CREATE TABLE IF NOT EXISTS likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rector_id VARCHAR(50) NOT NULL,
    user_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY unique_like (rector_id, user_id),
    INDEX idx_rector_id (rector_id),
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de visitas
CREATE TABLE IF NOT EXISTS visits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rector_id VARCHAR(50) NULL, -- NULL para visitas a intro/credits
    page_type ENUM('intro', 'rector', 'credits') NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    user_agent TEXT,
    session_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_rector_id (rector_id),
    INDEX idx_page_type (page_type),
    INDEX idx_created_at (created_at),
    INDEX idx_session_id (session_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Tabla de sesiones (para evitar contar la misma visita múltiples veces)
CREATE TABLE IF NOT EXISTS sessions (
    session_id VARCHAR(100) PRIMARY KEY,
    user_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_user_id (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Vista para estadísticas de likes por rector
CREATE OR REPLACE VIEW likes_stats AS
SELECT 
    rector_id,
    COUNT(*) as total_likes
FROM likes
GROUP BY rector_id;

-- Vista para estadísticas de visitas por rector
CREATE OR REPLACE VIEW visits_stats AS
SELECT 
    rector_id,
    page_type,
    COUNT(DISTINCT session_id) as unique_visits,
    COUNT(*) as total_visits
FROM visits
WHERE rector_id IS NOT NULL
GROUP BY rector_id, page_type;

-- Vista para estadísticas generales
CREATE OR REPLACE VIEW general_stats AS
SELECT 
    COUNT(DISTINCT session_id) as total_unique_visitors,
    COUNT(*) as total_visits,
    COUNT(DISTINCT CASE WHEN page_type = 'intro' THEN session_id END) as intro_visits,
    COUNT(DISTINCT CASE WHEN page_type = 'rector' THEN session_id END) as rector_visits,
    COUNT(DISTINCT CASE WHEN page_type = 'credits' THEN session_id END) as credits_visits
FROM visits;

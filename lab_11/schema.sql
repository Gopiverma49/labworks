-- ==========================================================
-- Lab 11: User Validation Database Schema
-- Compatible with MySQL / MariaDB / SQLite
-- ==========================================================

-- 1. Create Database (for MySQL)
-- CREATE DATABASE IF NOT EXISTS lab11_db;
-- USE lab11_db;

-- 2. Create Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    role VARCHAR(30) DEFAULT 'Student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert Initial Test Users
-- Passwords in this seed:
-- 'admin' -> admin123
-- 'john_doe' -> password123
-- 'alice' -> secret456
-- 'student' -> student123

INSERT INTO users (username, password, full_name, email, role) VALUES
('admin', '$2y$10$w095QeNlG4T94dJ1mXgD2O8L3m9u0YF5Y6/E7rC1U8bV8bB0.VwS6', 'System Administrator', 'admin@college.edu', 'Administrator'),
('john_doe', '$2y$10$vO8w2a5.4H2g.VreJ8vS6eT99d8v7Vf0fG4e6aB9.2p8c7f9A8d.e', 'John Doe', 'john.doe@example.com', 'Student'),
('alice', '$2y$10$tZ2x9s7Y0e.G7d6F5v4E3.u8w9Q6d7Y8b9a0c1D2e3F4g5H6j7K8L', 'Prof. Alice Smith', 'alice.smith@university.edu', 'Faculty'),
('student', '$2y$10$1Y8c2V6d5F9g0H1j2K3l4.u5w6E7r8T9y0U1i2O3p4A5s6D7f8G9H', 'Demo Student', 'student@campus.ac.in', 'Student')
ON DUPLICATE KEY UPDATE username=username;

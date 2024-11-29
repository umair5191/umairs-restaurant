# Creating the database
CREATE DATABASE IF NOT EXISTS umairs_restaurant;
USE umairs_restaurant;

# Creating the table for the menu items
CREATE TABLE IF NOT EXISTS menu (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    vegan BOOLEAN NOT NULL
);

# Creating the table for the users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE, -- ensures there aren't duplicate usernames
    first VARCHAR(50) NOT NULL,
    last VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE, -- ensures there aren't duplicate emails
    hashedPassword VARCHAR(255) NOT NULL
);

# Creating the app user and granting priviliges
CREATE USER IF NOT EXISTS 'umairs_restaurant_app'@'localhost' IDENTIFIED BY 'restaurant123'; 
GRANT ALL PRIVILEGES ON umairs_restaurant.* TO 'umairs_restaurant_app'@'localhost';

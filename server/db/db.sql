CREATE TABLE users(
  id INT PRIMARY KEY AUTO_INCREMENT,
  HWMAC VARCHAR(17) NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE informacije(
  id INT PRIMARY KEY AUTO_INCREMENT,
  HWID INT REFERENCES users(id),
  senzor ENUM('A', 'B', 'C') NOT NULL,
  vreme TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  temperatura FLOAT NOT NULL,
  vlaznost FLOAT NOT NULL
);

CREATE TABLE zalivanje(
  id INT PRIMARY KEY AUTO_INCREMENT,
  HWID INT REFERENCES users(id),
  senzor ENUM('A', 'B', 'C') NOT NULL,
  vreme TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  vrsta ENUM('Automatski', 'Manuelno') NOT NULL
);

-- SAMPLE INSERT QUERIES
-- INSERT INTO informacije (senzor, temperatura, vlaznost)
-- VALUES ('A', 23.5, 65.0); 
-- INSERT INTO informacije (senzor, temperatura, vlaznost)
-- VALUES ('B', 21.1, 44.3); 
-- INSERT INTO informacije (senzor, temperatura, vlaznost)
-- VALUES ('C', 19.4, 76.2); 
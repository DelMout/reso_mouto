-- Read instructions on README for setting up the database on MySQL server

-- CREATE DATABASE essv2436_db_mouto CHARACTER SET 'utf8';
USE essv2436_db_mouto;

CREATE TABLE users
(
id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,    
prenom VARCHAR(255) NOT NULL UNIQUE,
email VARCHAR(255) NOT NULL,
password VARCHAR(255) NOT NULL,
date_signup DATE NOT NULL,
last_connect DATE NOT NULL,
photo VARCHAR(255),
jeton VARCHAR (255) UNIQUE,
emailPub TINYINT DEFAULT 0,
emailCom TINYINT DEFAULT 0,
isAdmin TINYINT DEFAULT 0
)
ENGINE=INNODB;

CREATE TABLE publications
(
id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,    
titre VARCHAR(255) NOT NULL,
texte_pub TEXT NOT NULL,
photo VARCHAR(255),
date_crea_pub DATE NOT NULL,
userId SMALLINT UNSIGNED NOT NULL,
CONSTRAINT fk_userId_pub FOREIGN KEY (userId) REFERENCES users(id)
ON DELETE CASCADE
ON UPDATE CASCADE
)
ENGINE=INNODB;

CREATE TABLE comments
(
id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,    
texte_com TEXT NOT NULL,
date_crea_com DATE NOT NULL,
userId SMALLINT UNSIGNED NOT NULL,
publicationId SMALLINT UNSIGNED NOT NULL,
CONSTRAINT fk_userId_com FOREIGN KEY (userId) REFERENCES users(id)
ON DELETE CASCADE
ON UPDATE CASCADE,
CONSTRAINT fk_pubId FOREIGN KEY (publicationId) REFERENCES publications(id)
ON DELETE CASCADE
ON UPDATE CASCADE
)
ENGINE=INNODB;

CREATE TABLE likepubs
(
id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,    
userId SMALLINT UNSIGNED NOT NULL,
publicationId SMALLINT UNSIGNED NOT NULL,
symbol VARCHAR(255) NOT NULL,
CONSTRAINT fk_userId_likepub FOREIGN KEY (userId) REFERENCES users(id)
ON DELETE CASCADE
ON UPDATE CASCADE,
CONSTRAINT fk_pubId_likepub FOREIGN KEY (publicationId) REFERENCES publications(id)
ON DELETE CASCADE
ON UPDATE CASCADE
)
ENGINE=INNODB;

CREATE TABLE likecoms
(
id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,    
userId SMALLINT UNSIGNED NOT NULL,
commentId SMALLINT UNSIGNED NOT NULL,
symbol VARCHAR(255) NOT NULL,
CONSTRAINT fk_userId_likecom FOREIGN KEY (userId) REFERENCES users(id)
ON DELETE CASCADE
ON UPDATE CASCADE,
CONSTRAINT fk_comId_likecom FOREIGN KEY (commentId) REFERENCES comments(id)
ON DELETE CASCADE
ON UPDATE CASCADE
)
ENGINE=INNODB;
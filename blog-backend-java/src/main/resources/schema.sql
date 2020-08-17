CREATE TABLE users (
	id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(45) NOT NULL UNIQUE,
    encoded_password VARCHAR(100) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE posts (
	id BIGINT NOT NULL AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    body_text LONGTEXT NOT NULL,
    date_create DATETIME DEFAULT NOW(),
    last_updated DATETIME DEFAULT NOW(),
    user_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
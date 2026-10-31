
CREATE TABLE IF NOT EXISTS shop_games(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    min_players INT NOT NULL CHECK(min_players >=1),
    max_players INT NOT NULL,
    CONSTRAINT players_oprder CHECK(max_players >= min_players)
);

CREATE TABLE IF NOT EXISTS shop_bookings(
    id SERIAL PRIMARY KEY,
    game_id INT NOT NULL REFERENCES shop_games(id) ON DELETE RESTRICT,
    customer TEXT NOT NULL,
    UNIQUE(game_id,customer)
);

INSERT INTO shop_games (title,category,min_players,max_players) VALUES
('Catan','strategy',3,4),('Uno','card',2,10);

INSERT INTO shop_bookings (game_id,customer) VALUES(1,'Asha');

SELECT * FROM shop_games;
SELECT * FROM shop_bookings;

INSERT INTO shop_games (title,category,min_players,max_players) 
VALUES (NULL,'party',1,2);

INSERT INTO shop_games (title,category,min_players,max_players)
VALUES('Catan','strategy',3,4);

INSERT INTO shop_games (title,category,min_players,max_players)
VALUES('Zero','party',0,4);

INSERT INTO shop_games (title,category,min_players,max_players)
VALUES('Reversed','party',5,2);

INSERT INTO shop_bookings (game_id,customer)
VALUES(99,'Ravi');

INSERT INTO shop_bookings (game_id,customer)
VALUES(1,'Asha');

DELETE FROM shop_games WHERE id=1;

CREATE TABLE IF NOT EXISTS shop_games(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    min_players INT NOT NULL CHECK(min_players >=1),
    max_players INT NOT NULL,
    CONSTRAINT players_oprder CHECK(max_players >= min_players)
);

CREATE TABLE IF NOT EXISTS shop_bookings2(
    id SERIAL PRIMARY KEY,
    game_id INT NOT NULL REFERENCES shop_games(id) ON DELETE CASCADE,
    customer TEXT NOT NULL,
    UNIQUE(game_id,customer)
);
INSERT INTO shop_bookings2 (game_id,customer) VALUES(2,'Meera'); 
DELETE FROM shop_games WHERE id=2;
SELECT * FROM shop_bookings2;

ALTER TABLE shop_games ADD CONSTRAINT category_not_empty CHECK(category <> '');

INSERT INTO shop_games(title,category,min_players,max_players)
VALUES ('Empty','',1,2);



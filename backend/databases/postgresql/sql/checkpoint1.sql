CREATE TABLE IF NOT EXISTS cp_games (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    play_time INT NOT NULL CHECK (play_time >0)

);
CREATE TABLE IF NOT EXISTS cp_reservations (
    id SERIAL PRIMARY KEY,
    game_id INT NOT NULL REFERENCES cp_games(id),
    customer TEXT NOT NULL,
    reserved_on DATE NOT NULL
);

INSERT INTO cp_games (title,category,play_time) VALUES
('Catan','strategy',90),('Uno','card',30),('Chess','strategy',60),('Dixit','party',40),('Risk','strategy',120),('Poker','card',60),('Skribbl','party',25);

INSERT INTO cp_reservations (game_id,customer,reserved_on) VALUES 
(1,'Asha','2026-10-01'),(1,'Ravi','2026-10-02'),(2,'Asha','2026-10-02'),(3,'Meera','2026-10-03'),(1,'Karan','2026-10-05'),(5,'Ravi','2026-10-06'),(6,'Asha','2026-10-07'),(2,'Meera','2026-10-08'),(5,'Karan','2026-10-09');

SELECT * FROM cp_games;
SELECT * FROM cp_reservations;
SELECT COUNT(*) FROM cp_games;
SELECT COUNT(*) FROM cp_reservations;
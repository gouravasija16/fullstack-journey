DROP TABLE IF EXISTS node_games;
CREATE TABLE node_games (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    play_time INT NOT NULL
);
INSERT INTO node_games (title,category,play_time) VALUES 
('Catan','strategy',90),('Uno','card',30),('Chess','strategy',60),('Dixit','party',40),('Risk','strategy',120);
SELECT * FROM node_games;
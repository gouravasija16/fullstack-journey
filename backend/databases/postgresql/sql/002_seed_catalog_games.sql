INSERT INTO catalog_games (title,category,copies) VALUES 
('Catan','strategy',3),
('Uno','card',5),
('chess','strategy',2);


--INSERT RETURNING 
INSERT INTO catalog_games (title,category,copies) VALUES
('Dixit','party',4)
RETURNING id,title;

--UPDATE
SELECT * FROM catalog_games WHERE title='Catan';
UPDATE catalog_games SET copies =copies -1 WHERE title ='Catan' 
RETURNING * ;

UPDATE catalog_games SET copies = copies -10 WHERE title ='chess'
RETURNING * ;

--DELETE 
DELETE FROM catalog_games WHERE title ='Uno' RETURNING * ;

ALTER TABLE catalog_games ADD CONSTRAINT catalog_games_title_unique UNIQUE (title);

--UPSERT 
INSERT INTO catalog_games (title,category,copies) VALUES
('chess','strategy',4)
ON CONFLICT (title)
DO UPDATE SET copies = catalog_games.copies + EXCLUDED.copies
RETURNING *;

INSERT INTO catalog_games (title,category,copies) VALUES
('Dixit','party',9)
ON CONFLICT (title)
DO NOTHING
RETURNING *;

--ALTER TABLE
ALTER TABLE catalog_games ADD COLUMN min_players INT NOT NULL DEFAULT 1;
ALTER TABLE catalog_games ADD COLUMN max_players INT NOT NULL DEFAULT 4;
ALTER TABLE catalog_games ADD CONSTRAINT players_order CHECK (min_players <= max_players);

SELECT * FROM catalog_games;
UPDATE catalog_games SET min_players = 5, max_players = 10 WHERE title ='Catan'
RETURNING *;




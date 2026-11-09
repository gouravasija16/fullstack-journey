CREATE TABLE IF NOT EXISTS node_games (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    play_time INT NOT NULL
);

INSERT INTO node_games (title, category, play_time)
SELECT seed.title, seed.category, seed.play_time
FROM (VALUES
    ('Catan', 'strategy', 90),
    ('Uno', 'card', 30),
    ('Chess', 'strategy', 60),
    ('Dixit', 'party', 40),
    ('Risk', 'strategy', 120)
) AS seed(title, category, play_time)
WHERE NOT EXISTS (
    SELECT 1
    FROM node_games AS existing
    WHERE existing.title = seed.title
);
SELECT * FROM node_games;

SELECT current_database(), current_schema();
SELECT schemaname, tablename
FROM pg_tables
WHERE tablename = 'node_games';
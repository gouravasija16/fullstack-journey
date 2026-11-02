CREATE TABLE catalog_games (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    copies INT NOT NULL DEFAULT 1 CHECK (copies >= 0)
);

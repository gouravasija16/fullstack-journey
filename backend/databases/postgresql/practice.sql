SELECT current_user, current_database();

CREATE TABLE IF NOT EXISTS board_games (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    play_time INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS game_bookings (
    id SERIAL PRIMARY KEY,
    game_id INTEGER NOT NULL REFERENCES board_games(id),
    customer TEXT NOT NULL
);

INSERT INTO board_games (title, category, play_time)
SELECT sample.title, sample.category, sample.play_time
FROM (VALUES
    ('Catan', 'strategy', 90),
    ('Uno', 'card', 90),
    ('Chess', 'strategy', 90),
    ('Dixit', 'party', 40)
) AS sample(title, category, play_time)
WHERE NOT EXISTS (
    SELECT 1
    FROM board_games AS existing
    WHERE existing.title = sample.title
);

INSERT INTO game_bookings (game_id, customer)
SELECT board_games.id, sample.customer
FROM (VALUES
    ('Catan', 'Asha'),
    ('Catan', 'Ravi'),
    ('Uno', 'Asha'),
    ('Chess', 'Meera'),
    ('Catan', 'Karan'),
    ('Dixit', 'Arun')
) AS sample(game_title, customer)
JOIN board_games ON board_games.title = sample.game_title
WHERE NOT EXISTS (
    SELECT 1
    FROM game_bookings AS existing
    WHERE existing.game_id = board_games.id
      AND existing.customer = sample.customer
);

SELECT * FROM board_games;
SELECT * FROM game_bookings;
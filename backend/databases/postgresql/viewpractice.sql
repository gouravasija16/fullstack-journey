SELECT current_database();
INSERT INTO board_games (title, category, play_time)
SELECT sample.title, sample.category, sample.play_time
FROM (VALUES
    ('Risk', 'strategy', 120),
    ('Poker', 'card', 60),
    ('Skribbl', 'party', 25)
) AS sample(title, category, play_time)
WHERE NOT EXISTS (
    SELECT 1
    FROM board_games AS existing
    WHERE existing.title = sample.title
);

CREATE OR REPLACE VIEW games_with_bookings AS
SELECT
    g.id,
    g.title,
    g.category,
    COUNT(r.id) AS booking_count
FROM board_games AS g
LEFT JOIN game_bookings AS r ON g.id = r.game_id
GROUP BY g.id, g.title, g.category;

SELECT * FROM games_with_bookings
ORDER BY title;

SELECT title FROM games_with_bookings
WHERE category='strategy';

SELECT category,SUM(booking_count) AS total
FROM games_with_bookings
GROUP BY category;

CREATE OR REPLACE VIEW strategy_games AS 
SELECT g.title,g.play_time,r.customer
FROM board_games g INNER JOIN game_bookings r ON g.id = r.game_id
WHERE g.category = 'strategy'
ORDER BY r.customer;

SELECT * FROM strategy_games;

SELECT * FROM board_games
WHERE title IN ('Risk', 'Poker', 'Skribbl');

SELECT g.title, b.customer
FROM board_games AS g
JOIN game_bookings AS b ON b.game_id = g.id
ORDER BY g.title, b.customer;

SELECT title AS game , COUNT(b.id) AS bookings FROM board_games g 
LEFT JOIN game_bookings b ON g.id = b.game_id
GROUP BY g.title;

SELECT g.title FROM board_games g 
LEFT JOIN game_bookings r ON r.game_id = g.id 
WHERE r.game_id is  NOT NULL;

SELECT DISTINCT r.customer FROM game_bookings r INNER JOIN board_games b ON  b.id =  r.game_id
WHERE b.category = 'strategy';

SELECT g.customer, SUM(b.play_time) AS total_playtime
FROM board_games b INNER JOIN
game_bookings g ON
g.game_id = b.id
GROUP BY g.customer
HAVING  SUM(b.play_time) > 60;

--subqueries

SELECT title FROM
board_games  
WHERE play_time > (SELECT AVG(play_time) FROM  board_games  WHERE category = 'strategy');

SELECT DISTINCT customer
FROM game_bookings WHERE game_id IN (SELECT id FROM board_games WHERE title = 'Catan');

SELECT title FROM board_games WHERE play_time =(SELECT MAX(play_time) AS longest_game FROM board_games );

SELECT g.title FROM board_games g
WHERE EXISTS (SELECT 1 FROM game_bookings r WHERE  r.customer = 'Asha' AND r.game_id = g.id);

SELECT g.title FROM board_games g
WHERE id NOT IN  (SELECT r.game_id FROM game_bookings r WHERE  r.customer = 'Asha');
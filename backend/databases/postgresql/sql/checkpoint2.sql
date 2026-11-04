--Question 1
SELECT g.title, r.customer, r.reserved_on
FROM cp_games g INNER JOIN cp_reservations r ON  g.id = r.game_id 
ORDER BY r.game_id, r.reserved_on;

--Question 2
SELECT g.title ,COUNT(r.game_id) AS bookings_per_game 
FROM cp_games g LEFT JOIN  cp_reservations r ON g.id = r.game_id 
GROUP BY g.title
ORDER BY COUNT(r.game_id) DESC,g.title;

--Question 3
SELECT g.title ,COUNT(r.game_id) AS bookings_per_game 
FROM cp_games g LEFT JOIN  cp_reservations r ON g.id = r.game_id 
GROUP BY g.title
HAVING COUNT(r.game_id) >=2
ORDER BY COUNT(r.game_id) DESC,g.title;

--Question 4
SELECT title FROM cp_games g
WHERE NOT EXISTS (
    SELECT 1 FROM cp_reservations r 
    WHERE r.game_id = g.id
    )
ORDER BY g.title;

--Question 5
SELECT category , COUNT(category) AS game_count , ROUND(AVG(play_time),1) AS avg_playtime
FROM cp_games 
GROUP BY category
ORDER BY category;

--Question 6
SELECT r.customer, SUM(g.play_time) AS total_playtime
FROM cp_reservations r 
INNER JOIN cp_games g ON g.id = r.game_id
GROUP BY customer 
HAVING SUM(g.play_time) >150
ORDER BY total_playtime DESC, r.customer;

--Question 7
SELECT g.title , g.play_time 
FROM cp_games g
WHERE g.play_time > (SELECT AVG(play_time)
FROM cp_games g )
ORDER BY g.play_time DESC;

--Question 8
With CTE AS (
    SELECT r.customer, COUNT(DISTINCT g.category )
    FROM cp_reservations r
    INNER JOIN cp_games g ON g.id = r.game_id 
    GROUP BY customer
    HAVING COUNT(DISTINCT g.category)>=2
    ORDER BY customer
)
SELECT * FROM CTE;

--Question 9
SELECT category , title, play_time
FROM (SELECT category,title,play_time,ROW_NUMBER() OVER (PARTITION BY category ORDER BY play_time DESC)  AS rn
FROM cp_games
) ranked
WHERE rn=1
ORDER BY category;

--Question 10
SELECT r.customer,g.title, ROW_NUMBER() OVER (PARTITION BY r.customer ORDER BY r.reserved_on) AS booking_no
FROM cp_games g INNER JOIN cp_reservations r ON g.id = r.game_id
ORDER BY r.customer, r.reserved_on;

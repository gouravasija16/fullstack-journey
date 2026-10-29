--GROUP BY 
SELECT category,SUM(play_time) AS total
FROM board_games 
GROUP BY category;

--Window
SELECT title,category,play_time,
SUM (play_time) OVER (PARTITION BY category ORDER BY title ) AS category_total
FROM board_games ;

--ROW_NUMBER 
SELECT title,category,play_time,
ROW_NUMBER() OVER (PARTITION BY category ORDER BY play_time)
FROM board_games;

--RANK
SELECT title,category,play_time,
RANK() OVER (PARTITION BY category ORDER BY play_time)
FROM board_games;

--DENSE_RANK
SELECT title,category,play_time,
DENSE_RANK() OVER (PARTITION BY category ORDER BY play_time)
FROM board_games;

--LAG function
SELECT title,category,play_time,
LAG(play_time,1) OVER(PARTITION BY category ORDER BY play_time) As pre_play_time
FROM board_games;

--LEAD function
SELECT title,category,play_time,
LEAD(play_time,1) OVER(PARTITION BY category ORDER BY play_time) As next_play_time
FROM board_games;



--TABLE Creation
CREATE TABLE bookings_big AS 
SELECT g AS id,
(random() * 5000) ::int + 1 AS customer_id,
(random() * 10) ::int +1 AS game_id,
NOW() - make_interval(days=>(random() * 365)::int) AS created_at
FROM generate_series(1,100000) AS g;

ANALYZE bookings_big;
SELECT COUNT(*) FROM bookings_big;

EXPLAIN ANALYZE SELECT * FROM bookings_big WHERE customer_id = 4242;

--Index Creation
CREATE INDEX idx_bookings_big_customer ON bookings_big(customer_id);
ANALYZE bookings_big;

EXPLAIN ANALYZE SELECT * FROM bookings_big WHERE customer_id = 4242;

--low selectivity
EXPLAIN ANALYZE SELECT * FROM bookings_big WHERE game_id =3;

--Function on the column : Index ignored
CREATE INDEX idx_created ON bookings_big(created_at);
EXPLAIN ANALYZE SELECT * FROM bookings_big WHERE DATE(created_at) = CURRENT_DATE;

--Index is used, given as range
EXPLAIN ANALYZE SELECT * FROM bookings_big 
WHERE created_at >= CURRENT_DATE AND created_at < CURRENT_DATE +1;

EXPLAIN ANALYZE SELECT * FROM bookings_big 
WHERE created_at >= NOW() - INTERVAL '6 hours';

EXPLAIN ANALYZE SELECT * FROM bookings_big 
WHERE created_at >= NOW() - INTERVAL '3 days';

--Unique index
CREATE UNIQUE INDEX idx_users_email ON users_big(email);

--Expression Index
CREATE INDEX idx_email_lower ON users_big(LOWER(email));

--Partial index: only index recent rows
CREATE INDEX idx_recent ON bookings_big(customer_id)
WHERE created_at >='2026-01-01'

--See all indexes on a table
SELECT indexname, indexdef FROM pg_indexes WHERE tablename ='bookings_big';

--Drop an index 
DROP INDEX idx_recent

--Multiple indexes
CREATE INDEX idx_multiple ON bookings_big(customer_id,game_id);




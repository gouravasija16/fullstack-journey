import pool from "./db.js"

const who = await pool.query("SELECT current_database() AS db, current_user AS usr")
console.log("Connected to:",who.rows[0])

const tables = await pool.query(
    "SELECT table_name FROM information_schema.table WHERE table_schema= 'public'"
)
await pool.end()
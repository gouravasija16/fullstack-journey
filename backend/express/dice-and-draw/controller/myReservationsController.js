import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

export async function getMyReservations(req, res) {
    const userId = req.session.userId
    if (!userId) {
        return res.status(401).json({ error: 'Not logged in' })
    }

    let db
    try {
        db = await open({
            filename: path.join('database.db'),
            driver: sqlite3.Database
        })

        const reservations = await db.all(
            `SELECT
                r.id,
                r.userId,
                r.gameId,
                g.title AS gameTitle,
                r.date,
                r.startHour,
                r.hours,
                r.players
             FROM reservations AS r
             INNER JOIN games AS g ON g.id = r.gameId
             WHERE r.userId = ?
             ORDER BY r.date ASC, r.startHour ASC`,
            [userId]
        )

        return res.status(200).json({ reservations })
    } catch (err) {
        console.error('Error retrieving user reservations:', err)
        return res.status(500).json({ error: 'Could not load reservations' })
    } finally {
        if (db) await db.close()
    }
}

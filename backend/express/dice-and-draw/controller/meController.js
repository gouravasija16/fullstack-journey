import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'

export async function displayName(req, res) {
    const userId = req.session.userId
    let db
    if (!userId) {
        return res.status(401).json({ message: 'Not logged in' })
    }
    try {
        db = await open({
            filename: path.join('database.db'),
            driver: sqlite3.Database
        })
        const user = await db.get(
            'SELECT id, username FROM users WHERE id = ?',
            [userId]
        )
        if (!user) {
            return res.status(401).json({ message: 'Not logged in' })
        }

        return res.json({
            user: { id: user.id, name: user.username }
        })
    } catch (err) {
        console.error('Error retrieving current user:', err)
        return res.status(500).json({ error: 'Internal server error' })
    } finally {
        if (db) await db.close()
    }
}
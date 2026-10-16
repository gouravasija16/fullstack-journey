import bcrypt from 'bcryptjs'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'node:path'
import validator from 'validator'

export async function registerUser(req, res) {
    let db
    let { name, password, email } = req.body
    if (!name || !password || !email) {
        return res.status(400).json({ error: 'Missing required fields' })
    }
    name = name.trim()
    email = email.trim()
    if (!/^[a-zA-Z0-9]([a-zA-Z0-9_-]{1,20})$/.test(name)) {
        return res.status(400).json({ error: 'Invalid name' })
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email' })
    }
    try {
        db = await open({
            filename: path.join('database.db'),
            driver: sqlite3.Database
        })
        const existingUser = await db.get(
            'SELECT id FROM users WHERE username = ? OR email = ?',
            [name, email]
        )
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await db.run(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        )
        req.session.userId = newUser.lastID
        return res.status(201).json({
            message: 'User successfully added',
            user: { id: newUser.lastID, name }
        })
    } catch (err) {
        console.error('Error occurred while registering user:', err)
        return res.status(500).json({ error: 'Internal server error' })
    } finally {
        if (db) await db.close()
    }
}

export async function loginUser(req, res) {
    let db
    let { name, password } = req.body
    if (!name || !password) {
        return res.status(400).json({ error: 'Name and password are required' })
    }
    name = name.trim()
    try {
        db = await open({
            filename: path.join('database.db'),
            driver: sqlite3.Database
        })
        const user = await db.get('SELECT * FROM users WHERE username = ?', [name])
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        req.session.userId = user.id
        return res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, name: user.username }
        })
    } catch (err) {
        console.error('Error occurred while login user:', err)
        return res.status(500).json({ error: 'Login failed. Please try again.' })
    } finally {
        if (db) await db.close()
    }
}

export async function logoutUser(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err)
            return res.status(500).json({ error: 'Could not log out' })
        }
        return res.status(200).json({ message: 'Logged out' })
    })
}
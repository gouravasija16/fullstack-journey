import bcrypt from 'bcryptjs'
import sqlite3 from 'sqlite3'
import {open} from 'sqlite'
import path from 'node:path'
import validator from 'validator'
export async function registerUser(req,res){
    let db
    console.log('User registration request received:', req.body);
    let {name,password,email}=req.body
    if(!name || !password || !email){
        return res.status(400).json({error:'Missing required fields'})
    }
    name=name.trim()
    email=email.trim()
    if(!/^[a-zA-Z0-9]([a-zA-Z0-9_-]{1,20})$/.test(name)){
        return res.status(400).json({error:'Invalid name'})
    }
    if(!validator.isEmail(email)){
        return res.status(400).json({error:'Invalid email'})
    }
    try{
          db = await open({
                filename:path.join('database.db'),
                driver: sqlite3.Database
            })
         const existingUser = await db.get('SELECT * FROM users WHERE username = ? OR email = ?', [name, email])
        
         if(existingUser){
             return res.status(400).json({error:'User already exists'})
         }
         const hashedPassword = await bcrypt.hash(password,10)

         const newUserData = await db.run(`INSERT INTO users (username,email,password) VALUES(?,?,?)`,[name,email,hashedPassword])
          res.status(201).json({message:`User successfully added`})
         console.log(newUserData)
        req.session.userId = newUserData.lastID

    }catch(err){
        console.error('Error occurred while registering user:', err)
        return res.status(500).json({error:'Internal server error'})
    }finally{
        if(db){
            await db.close()
        }
    }
}
import express from "express"
import path from "node:path"
import {logger} from "./middleware/logger.js"
import {gamesRouter} from "./routes/games.js"
import { authRouter } from "./routes/auth.js"
import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config()
const app=express()
app.use(express.json())
const secret = process.env.SESSION_SECRET || 'express_dice-draw-secret'

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie:{
        httpOnly:true,
        secure:false,
        sameSite:'lax'
    }
}))
app.use(logger)
app.use(express.static(path.join(import.meta.dirname, 'public')))
app.use('/api/auth', authRouter)
app.get('/api/health',(req,res)=>{
    res.json({status:'ok'})
})
app.use('/api', gamesRouter)
app.listen(8082,()=>{
    console.log('server connected on Port:8082')
}).on('error',(err)=>{
    console.error('Failed to start server:',err)
})
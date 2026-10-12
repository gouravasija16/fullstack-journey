import express from "express"
import path from "node:path"
import {logger} from "./middleware/logger.js"
import {gamesRouter} from "./routes/games.js"
const app=express()
app.use(logger)
app.use(express.static(path.join(import.meta.dirname, 'public')))
app.get('/api/health',(req,res)=>{
    res.json({status:'ok'})
})
app.use('/api', gamesRouter)
app.listen(8082,()=>{
    console.log('server connected on Port:8082')
}).on('error',(err)=>{
    console.error('Failed to start server:',err)
})
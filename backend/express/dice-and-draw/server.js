import express from "express"
import path from "node:path"
import logger from "./middleware/logger.js"
const app=express()
app.use(logger)
app.use(express.static(path.join(import.meta.dirname, 'public')))
app.get('/api/health',(req,res)=>{
    res.json({status:'ok'})
})
app.listen(8081,()=>{
    console.log('server connected on Port:8081')
}).on('error',(err)=>{
    console.error('Failed to start server:',err)
})
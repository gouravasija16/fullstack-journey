import express from "express"
import { apiRouter } from "./Routes/apiRouter.js"
import cors from "cors"
const app=express()
app.use(cors())
app.use('/api',apiRouter)
app.listen(8080,()=>console.log(`server connected on Port:8080`))
app.use((req,res)=>{
    res.status(404).json({message:'Page not found, please check the URL'})
})
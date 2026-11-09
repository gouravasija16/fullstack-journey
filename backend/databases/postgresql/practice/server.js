import express from "express"
import pool from "./db.js"
import "dotenv/config"
const app = express()
app.get('/api/games',async (req,res)=>{
  try{
    const result = await pool.query("SELECT * FROM node_games ORDER BY id")
    return res.status(200).json(result.rows)
  }catch(err){
    console.error(err)
   return  res.status(500).json({error:'Server error',err})

  }
})
app.get('/api/games/category/:name',async (req,res) =>{
    try{
        const result = await pool.query(
            'SELECT * FROM node_games WHERE category = $1 ORDER BY id',[req.params.name]
        )
        return res.status(200).json(result.rows)
    }catch(err){
        console.log(err)
    return res.status(500).json({error:'Server error'})
 
    }
})
app.get('/api/games/:id',async (req,res) =>{
    try{
        const result = await pool.query(
            'SELECT * FROM node_games WHERE id = $1',[req.params.id]
        )
        if (result.rows.length===0){
            return res.status(404).json({error:'Game not found'})

        }
        return res.status(200).json(result.rows[0])
    }catch(err){
        console.log(err)
    return res.status(500).json({error:'Server error'})
 
    }
})
app.listen(process.env.PORT,()=>console.log('server connected on Port:',process.env.PORT))
import sqlite3 from 'sqlite3'
import path from "path"
import {open} from "sqlite"
export async function categoriesController(req,res){
   
    try{
         const db =await open({
                filename:path.join('database.db'),
                driver: sqlite3.Database
            })
         const rows =await db.all('SELECT DISTINCT category FROM games')
         const category= rows.map(row=>row.categories)
        res.status(200).json(category)

    }catch(err){
        res.status(500).json({error:'Failed to fetch categories',details:err.message})

    }

    
}
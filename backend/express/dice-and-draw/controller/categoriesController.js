import sqlite3 from 'sqlite3'
import path from "path"
import {open} from "sqlite"
export async function categoriesController(){
   
    try{
         const db =await open({
                filename:path.join('database.db'),
                driver: sqlite3.Database
            })
         const rows =await db.all('SELECT DISTINCT category FROM games')
         const categories= rows.map(row=>row.categories)
        res.status(200).json(categories)

    }catch(err){
        res.status(500).json({error:'Failed to fetch categories',details:err.message})

    }

    
}
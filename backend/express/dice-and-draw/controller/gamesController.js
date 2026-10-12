import sqlite3 from 'sqlite3'
import path from "path"
import {open} from "sqlite"
export  async function gamesController(req,res){
    const db =await open({
            filename:path.join('database.db'),
            driver: sqlite3.Database
        })
    try{
        const query= `SELECT * FROM games WHERE`
        const params =[]
        
    }catch(err){

    }finally{
        
    }

}
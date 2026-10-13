import express from "express"
import sqlite3 from "sqlite3"
import path from "node:path"
import {open} from "sqlite"
export async function ReservationsController(req,res){
    console.log(req.body)
    const {gameId,name,players,date,startHour,hours}=req.body
    const db=await open({
            filename:path.join('database.db'),
            driver:sqlite3.Database
        })
    const game=await db.get('SELECT * FROM games WHERE id=?',[gameId])
    const now=new Date()
    const yyy= now.getFullYear()
    const mm =String(now.getMonth()+1).padStart(2,'0')
    const dd= String(now.getDate()).padStart(2,'0')
    const todayString=`${yyy}-${mm}-${dd}`

    if(!game){
        return res.status(404).json({error:'Game not found'})
    }
    try{
        if(typeof name !=='string' || name.trim()===''){
            return res.status(400).json({error:'Name is required and must be a non-empty string'})
        }
        if(!Number.isInteger(gameId)){
            return res.status(400).json({error:'gameId must be a Whole number'})
        }
        if(!Number.isInteger(players) || players<=0){
            return res.status(400).json({error:'players must be a positive integer'})
        }
        if(!Number.isInteger(startHour) || startHour<0 || startHour>23){
            return res.status(400).json({error:'startHour must be an integer between 0 and 23'})
        }
        if(!Number.isInteger(hours) || hours<=0){
            return res.status(400).json({error:'hours must be a positive integer'})
        }
        if(typeof date !=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)){
            return res.status(400).json({error:'date must be a string in the format YYYY-MM-DD'})
        }
        if(players<game.minPlayers || players>game.maxPlayers){
            return res.status(400).json({error:`players must be between ${game.minPlayers} and ${game.maxPlayers}`})
        }
        if(date<todayString){
            return res.status(400).json({error:'date cannot be in the past'})
        }
        if(startHour+hours>24){
            return res.status(400).json({error:'Reservation cannot exceed 24 hours in a day'})
        }

    }catch(err){
        console.error(err)
        return res.status(500).json({error:'Internal server error'})
    }

}
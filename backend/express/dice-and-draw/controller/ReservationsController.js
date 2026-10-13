import express from "express"
import sqlite3 from "sqlite3"
import path from "node:path"
import {open} from "sqlite"
import sanitizeHtml from 'sanitize-html'
export async function ReservationsController(req,res){
    console.log(req.body)
    //destruction of request body
    const {gameId,name,players,date,startHour,hours}=req.body
    let db
    try{
    db=await open({
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
        if(typeof name !=='string' || name.trim()===''){
            return res.status(400).json({error:'Name is required and must be a non-empty string'})
        }
        const parsedGameId = Number(gameId)
        if(!Number.isInteger(parsedGameId)){
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
        }if(date===todayString && startHour<now.getHours()){
            return res.status(400).json({error:'startHour cannot be in the past for today'})
        }
        //overlapping reservation check
        const NewEndHour=startHour + hours
        const overlappingReservations=await db.get(`
            SELECT COUNT(*) AS count FROM reservations 
            WHERE gameId = ? AND date= ?
            AND startHour < ?
            AND (startHour + hours) > ?
            `,[gameId ,date ,NewEndHour,startHour])

            //Availability condition check
            if(overlappingReservations.count>=game.copies){
                return res.status(400).json({error:'No available copies for the selected time slot'})
            }
            //sanitize-html for name
       const cleanName=sanitizeHtml(name,{allowedTags:[],allowedAttributes:{}}).trim()
       //Insertion into database
       await db.run(`
        INSERT INTO reservations(gameId,name,players,date,startHour,hours)
        VALUES(?,?,?,?,?,?)
        `,[gameId,cleanName,players,date,startHour,hours])

        return res.status(201).json({ message: 'Reservation created successfully' })

    }catch(err){
        console.error(err)
        return res.status(500).json({error:'Internal server error'})

    }finally{
        if(db) await db.close()
    }

}
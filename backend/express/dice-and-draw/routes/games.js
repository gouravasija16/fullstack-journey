import express from "express"
import {gamesController} from "../controller/gamesController.js"
import {categoriesController} from "../controller/categoriesController.js"
import { ReservationsController } from "../controller/ReservationsController.js"
    export const gamesRouter=express.Router()
    gamesRouter.get('/games',gamesController)
    gamesRouter.get('/categories',categoriesController)
    gamesRouter.post('/reservations',ReservationsController)



import express from "express"
import {gamesController} from "../controller/gamesController.js"
import {categoriesController} from "../controller/categoriesController.js"
    export const gamesRouter=express.Router()
    gamesRouter.get('/games',gamesController)
    gamesRouter.get('/categories',categoriesController)



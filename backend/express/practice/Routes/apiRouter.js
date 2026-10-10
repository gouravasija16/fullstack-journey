import express from "express"
import {getRecipes} from "../controller/getRecipes.js"
import {getRecipesByField} from "../controller/getRecipesByField.js"
export const apiRouter=express.Router()
apiRouter.get('/recipes',getRecipes)
apiRouter.get('/:field/:term',getRecipesByField)


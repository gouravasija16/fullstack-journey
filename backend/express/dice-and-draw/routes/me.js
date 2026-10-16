import express from 'express'
import {displayName} from '../controller/meController.js'
 export const displayNameRouter=express.Router()
    displayNameRouter.get('/me',displayName)
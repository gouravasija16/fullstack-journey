import express from "express"
import {registerUser} from '../controller/registerUser.js'
export const authRouter=express.Router()
authRouter.post('/register',registerUser)
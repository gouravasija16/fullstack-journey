import express from 'express'
import { getMyReservations } from '../controller/myReservationsController.js'

export const reservationsRouter = express.Router()
reservationsRouter.get('/reservations', getMyReservations)

import express from 'express'
import { getMyReservations,deleteReservation } from '../controller/myReservationsController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const reservationsRouter = express.Router()
reservationsRouter.get('/reservations', requireAuth, getMyReservations)
reservationsRouter.delete('/reservations/:reservationId', requireAuth, deleteReservation)

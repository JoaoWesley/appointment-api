import express from 'express'
import {
  getFreeSlots
} from '../../controllers/api/slotController'

const router = express()

router.get('/', getFreeSlots)

export default router

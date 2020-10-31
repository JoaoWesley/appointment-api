import express from 'express'
import {
  getEvents,  
  postEvent,  
} from '../../controllers/api/eventController'

const router = express()

router.get('/', getEvents)
router.post('/', postEvent)

export default router

import HttpStatus from 'http-status-codes'
import * as eventService from '../../services/eventService'

export const getEvents = async (req, res) => {
  const events = await eventService.getEvents(req.query.startDate, req.query.endDate)
  res.status(HttpStatus.OK).json(events)
}

export const postEvent = async (req, res) => {  
  const eventCreated = await eventService.createEvent(req.body.dateTime, req.body.duration)

  res.status(HttpStatus.CREATED).json(eventCreated)
}
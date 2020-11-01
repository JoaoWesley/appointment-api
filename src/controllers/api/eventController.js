import HttpStatus from 'http-status-codes'
import * as eventService from '../../services/eventService'
import eventRequestSchema from '../../validators/eventRequestSchema'
import exceptionCode from '../../commons/types/exceptionCode'

export const getEvents = async (req, res) => {
  const events = await eventService.getEvents(req.query.startDate, req.query.endDate)
  if(events.length === 0) {
    return res.status(HttpStatus.OK).json({ message: 'Not events was found for the specified period' })  
  }
  res.status(HttpStatus.OK).json(events)
}

export const postEvent = async (req, res) => { 
  const { validationError, value: updateParams } = eventRequestSchema.validate(
    req.body,
  );

  if (validationError) {
    return res
      .json({ message: validationError.message })
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .end();
  }

  try {
    const eventCreated = await eventService.createEvent(req.body.dateTime)
    res.status(HttpStatus.OK).json(eventCreated)
  } catch (error) {
    if(
      error.code === exceptionCode.EVENT_ALREADY_EXISTS || 
      error.code === exceptionCode.OUTSIDE_AVAILABLE_HOURS || 
      error.code === exceptionCode.INVALID_TIME_FOR_SLOT
      ) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: error.message })
    }   

    res
      .status(HttpStatus.BAD_REQUEST)
      .json({ message: error.message })
  }  
}
import HttpStatus from 'http-status-codes'
import * as eventService from '../../services/eventService'
import createEventRequestSchema from '../../validators/createEventRequestSchema'
import getEventsRequestSchema from '../../validators/getEventsRequestSchema'
import exceptionCode from '../../commons/types/exceptionCode'

export const getEvents = async (req, res) => {
  const { error: validationError } = getEventsRequestSchema.validate(req.query)
  if (validationError) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: validationError.message })
  }

  const events = await eventService.getEvents(
    req.query.startDate,
    req.query.endDate
  )
  if (events.length === 0) {
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Not events was found for the specified period' })
  }
  res.status(HttpStatus.OK).json(events)
}

export const postEvent = async (req, res) => {
  const { error: validationError } = createEventRequestSchema.validate(req.body)

  if (validationError) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: validationError.message })
  }

  try {
    const eventCreated = await eventService.createEvent(req.body.dateTime)
    res.status(HttpStatus.OK).json(eventCreated)
  } catch (error) {
    if (
      error.code === exceptionCode.EVENT_ALREADY_EXISTS ||
      error.code === exceptionCode.OUTSIDE_AVAILABLE_HOURS ||
      error.code === exceptionCode.INVALID_TIME_FOR_SLOT
    ) {
      return res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json({ message: error.message })
    }

    res.status(HttpStatus.BAD_REQUEST).json({ message: error.message })
  }
}

import HttpStatus from 'http-status-codes'
import * as slotService from '../../services/slotService'

export const getFreeSlots = async (req, res) => {
  const lessons = await slotService.getFreeSlots(req.query.dateTime, req.query.timeZone)
  res.status(HttpStatus.OK).json(lessons)
}
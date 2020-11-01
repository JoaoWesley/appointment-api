import HttpStatus from 'http-status-codes'
import * as slotService from '../../services/slotService'
import getFreeSlotsRequestSchema from '../../validators/getFreeSlotsRequestSchema'

export const getFreeSlots = async (req, res) => {
  const { error: validationError } = getFreeSlotsRequestSchema.validate(
    req.query,
  );
  if (validationError) {
    return res
      .json({ message: validationError.message })
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .end();
  }

  const lessons = await slotService.getFreeSlots(req.query.dateTime, req.query.timeZone)
  res.status(HttpStatus.OK).json(lessons)
}
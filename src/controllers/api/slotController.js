import HttpStatus from 'http-status-codes'
import * as slotService from '../../services/slotService'
import getFreeSlotsRequestSchema from '../../validators/getFreeSlotsRequestSchema'

export const getFreeSlots = async (req, res) => {
  const { error: validationError } = getFreeSlotsRequestSchema.validate(
    req.query
  )
  if (validationError) {
    return res
      .status(HttpStatus.UNPROCESSABLE_ENTITY)
      .json({ message: validationError.message })
  }

  const freeSlots = await slotService.getFreeSlots(
    req.query.date,
    req.query.timeZone
  )
  res.status(HttpStatus.OK).json(freeSlots)
}

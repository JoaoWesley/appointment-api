import Joi from '@hapi/joi'

const getFreSlotsRequestSchema = Joi.object()
  .keys({
    dateTime: Joi.date().required(),
    timeZone: Joi.string().required(),
  })
  .required()

export default getFreSlotsRequestSchema

import Joi from '@hapi/joi'

const getFreSlotsRequestSchema = Joi.object()
  .keys({
    date: Joi.date().required(),
    timeZone: Joi.string().required(),
  })
  .required()

export default getFreSlotsRequestSchema

import Joi from '@hapi/joi'

const createEventRequestSchema = Joi.object()
  .keys({
    dateTime: Joi.date().required(),
    duration: Joi.number().required(),
  })
  .required()

export default createEventRequestSchema

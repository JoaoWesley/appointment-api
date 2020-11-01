import Joi from '@hapi/joi'

const createEventRequestSchema = Joi.object()
  .keys({
    dateTime: Joi.date().required(),
  })
  .required()

export default createEventRequestSchema

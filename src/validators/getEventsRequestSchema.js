import Joi from '@hapi/joi';

const getEventsRequestSchema = Joi.object()
  .keys({
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
  })
  .required();

export default getEventsRequestSchema
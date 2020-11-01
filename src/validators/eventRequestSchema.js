import Joi from '@hapi/joi';

const eventRequestSchema = Joi.object()
  .keys({
    dateTime: Joi.date().required(),    
  })
  .required();

export default eventRequestSchema
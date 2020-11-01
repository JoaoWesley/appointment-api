import * as EventsModel from '../models/eventsModel'
import appointmentConfig from '../config/appointment-config'
import eventAlreadyExistsException from '../exception/eventAlreadyExistsException'
import moment from 'moment'

export const getEvents = async (startDate, endDate) => {
  startDate = moment.utc(startDate).format()
  endDate = moment.utc(endDate).format()
  return EventsModel.getEventsBetweenDates(startDate, endDate);  
}

export const createEvent = async (dateTime) => {
  dateTime = moment.utc(dateTime).format()

  if(await EventsModel.checkIfEventExists(dateTime)) {
    throw new eventAlreadyExistsException();
  }

  return EventsModel.save(dateTime, appointmentConfig.DURATION_IN_MINUTES);  
}
import * as EventsModel from '../models/eventsModel'

export const getEvents = async (startDate, endDate) => {
  return EventsModel.getEventsBetweenDates(startDate, endDate);  
}

export const createEvent = async (dateTime, duration) => {  
  return { dateTime, duration }  
}
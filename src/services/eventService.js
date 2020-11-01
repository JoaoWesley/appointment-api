import * as EventsModel from '../models/eventsModel'
import appointmentConfig from '../config/appointment-config'
import eventAlreadyExistsException from '../exception/eventAlreadyExistsException'
import outsideAvailableHoursException from '../exception/outsideAvailableHoursException'
import invalidTimeForSlotException from '../exception/invalidTimeForSlotException'
import moment from 'moment'
import * as momentTimezone from 'moment-timezone';

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

  if(checkIfOutSideAvailableHours(dateTime)) {
    throw new outsideAvailableHoursException();
  }

  if(checkIfIsInvalidTimeForSlot(dateTime)) {
    throw new invalidTimeForSlotException();
  }

  return EventsModel.save(dateTime, appointmentConfig.DURATION_IN_MINUTES);  
}

export const checkIfOutSideAvailableHours = (dateTime) => {
  const dateTimeWithConfigTimeZone = momentTimezone.tz(dateTime, appointmentConfig.TIMEZONE);

  const isBefore = dateTimeWithConfigTimeZone.format('HH:mm') < appointmentConfig.START_HOURS;
  const isAfter = dateTimeWithConfigTimeZone.format('HH:mm') >= appointmentConfig.END_HOURS;
  
  return isBefore || isAfter;
}


export const checkIfIsInvalidTimeForSlot = (dateTime) => {  
  const possibleTimeValuesForSlots = []
  const elapsedTime = moment.utc('2020-01-01 00:00');
  do {
    possibleTimeValuesForSlots.push(elapsedTime.format('HH:mm'))
    elapsedTime.add(appointmentConfig.DURATION_IN_MINUTES, 'minutes');
  }while(elapsedTime <  moment.utc('2020-01-01 23:59'));

  const findPossibleValues = possibleTimeValuesForSlots.find( (timeValue) => timeValue === moment.utc(dateTime).format('HH:mm'))

  if(!findPossibleValues) {
    return true;
  }  

  return false;
}
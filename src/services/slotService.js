import * as EventsModel from '../models/eventsModel'
import * as momentTimezone from 'moment-timezone';
import moment from 'moment'
import appointmentConfig from '../config/appointment-config'

export const getFreeSlots = async (requestedDateTime, timeZone) => {    
  const requestedDateTimeConverted = momentTimezone.tz(requestedDateTime, timeZone);
  const requestedDateTimeUtc = moment.utc(requestedDateTimeConverted).format();  

  const requestedDate =  moment.utc(requestedDateTimeUtc).format('YYYY-MM-DD')
  
  const startHoursWithConfigTimeZone = momentTimezone.tz(`${requestedDate} ${appointmentConfig.START_HOURS}`, appointmentConfig.TIMEZONE);
  const startHoursDateTimeUtc = moment.utc(startHoursWithConfigTimeZone) // Testar sem formatar

  const endHoursConfigTimeZone = momentTimezone.tz(`${requestedDate} ${appointmentConfig.END_HOURS}`, appointmentConfig.TIMEZONE);    
  const endHoursDateTimeUtc = moment.utc(endHoursConfigTimeZone) // Testar sem formatar
  

  //Getting all events within 24 hours of the requested day
  const events = await EventsModel.getEventsBetweenDates( 
    moment.utc(requestedDate).format('YYYY-MM-DD HH:mm'),
    moment.utc(requestedDate + '23:59').format('YYYY-MM-DD HH:mm')    
  );

  const freeSlots = []
  let elapsedTime = startHoursDateTimeUtc;  
  while(elapsedTime.format() <= endHoursDateTimeUtc.format()) {    
    const findEventsBooked = events.find( (event) => moment.utc(event.dateTime).format('YYYY-MM-DD HH:mm') === elapsedTime.format('YYYY-MM-DD HH:mm'))
    
    if(!findEventsBooked) {
      const elapsedTimeConvertedToRequestedTimeZone = momentTimezone.tz(elapsedTime, timeZone);
      freeSlots.push(elapsedTimeConvertedToRequestedTimeZone.format('HH:mm'))
    }
    elapsedTime = elapsedTime.add(appointmentConfig.DURATION_IN_MINUTES, 'minutes');
  }

  return freeSlots;  
}

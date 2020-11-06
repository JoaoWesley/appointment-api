import * as EventsModel from '../models/eventsModel'
import * as momentTimezone from 'moment-timezone'
import moment from 'moment'
import appointmentConfig from '../config/appointment-config'
import * as appointmentConfigService from '../services/appointmentConfigService'

export const getFreeSlots = async (requestedDate, timeZone) => {
  const requestedDateConverted = momentTimezone.tz(requestedDate, timeZone)
  const requestedTimeUtc = moment.utc(requestedDateConverted).format()

  const requestedDateUtc = moment.utc(requestedTimeUtc).format('YYYY-MM-DD')
  const {
    startHoursDateTimeUtc,
    endHoursDateTimeUtc,
  } = appointmentConfigService.getStartAndEndHoursFromDate(requestedDateUtc)

  //Getting all events within available hours of the requested day
  const events = await EventsModel.getEventsBetweenDates(
    startHoursDateTimeUtc.format(),
    endHoursDateTimeUtc.format()
  )

  const freeSlots = []
  let elapsedTime = startHoursDateTimeUtc
  while (elapsedTime.format() <= endHoursDateTimeUtc.format()) {
    const findEventsBooked = events.find(
      (event) =>
        elapsedTime.format('YYYY-MM-DD HH:mm') >=
          moment.utc(event.startDateTime).format('YYYY-MM-DD HH:mm') &&
        elapsedTime.format('YYYY-MM-DD HH:mm') <
          moment.utc(event.endDateTime).format('YYYY-MM-DD HH:mm')
    )

    if (!findEventsBooked) {
      const elapsedTimeConvertedToRequestedTimeZone = momentTimezone.tz(
        elapsedTime,
        timeZone
      )
      const isDifferentDay =
        elapsedTimeConvertedToRequestedTimeZone.format('DD') !==
        moment.utc(requestedDateUtc).format('DD')
      if (isDifferentDay) {
        //if the day changes then stops
        break
      }

      //Check if the date requested is now
      const nowInConfigTimeZone = momentTimezone.tz(moment.utc(), timeZone)
      const isDateRequestedNow =
        nowInConfigTimeZone.format('YYYY-MM-DD') ===
        requestedDateConverted.format('YYYY-MM-DD')

      if (isDateRequestedNow) {
        //Check if date already passed
        const isUnavailableTimeSlot =
          elapsedTimeConvertedToRequestedTimeZone.format('HH:mm') <
          nowInConfigTimeZone.format('HH:mm')
        if (isUnavailableTimeSlot) {
          elapsedTime = elapsedTime.add(
            appointmentConfig.DURATION_IN_MINUTES,
            'minutes'
          )
          continue
        }
      }

      freeSlots.push(
        elapsedTimeConvertedToRequestedTimeZone.format('YYYY-MM-DD HH:mm')
      )
    }
    elapsedTime = elapsedTime.add(
      appointmentConfig.DURATION_IN_MINUTES,
      'minutes'
    )
  }

  return freeSlots
}

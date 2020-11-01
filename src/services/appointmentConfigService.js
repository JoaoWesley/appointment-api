import * as momentTimezone from 'moment-timezone'
import moment from 'moment'
import appointmentConfig from '../config/appointment-config'

export const getStartAndEndHoursFromDate = (date) => {
  const startHoursWithConfigTimeZone = momentTimezone.tz(
    `${date} ${appointmentConfig.START_HOURS}`,
    appointmentConfig.TIMEZONE
  )
  const startHoursDateTimeUtc = moment.utc(startHoursWithConfigTimeZone)

  const endHoursConfigTimeZone = momentTimezone.tz(
    `${date} ${appointmentConfig.END_HOURS}`,
    appointmentConfig.TIMEZONE
  )
  const endHoursDateTimeUtc = moment.utc(endHoursConfigTimeZone)

  return { startHoursDateTimeUtc, endHoursDateTimeUtc }
}

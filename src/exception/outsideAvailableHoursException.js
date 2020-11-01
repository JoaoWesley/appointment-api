import exceptionCode from '../commons/types/exceptionCode'

function outsideAvailableHoursException (message) {
    this.name = 'Outside available hours';
    this.message = message || 'Date time is outside available hours';
    this.code = exceptionCode.OUTSIDE_AVAILABLE_HOURS;
    this.stack = new Error().stack;
}

outsideAvailableHoursException.prototype = Object.create(
  outsideAvailableHoursException.prototype
)
outsideAvailableHoursException.prototype.constructor = outsideAvailableHoursException

export default outsideAvailableHoursException
  
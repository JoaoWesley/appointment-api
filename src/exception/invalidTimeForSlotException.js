import exceptionCode from '../commons/types/exceptionCode'

function invalidTimeForSlotException (message) {
    this.name = 'Invalid time for slot';
    this.message = message || 'Time informed is invalid for slot, check available slots';
    this.code = exceptionCode.INVALID_TIME_FOR_SLOT;
    this.stack = new Error().stack;
}

invalidTimeForSlotException.prototype = Object.create(
  invalidTimeForSlotException.prototype
)
invalidTimeForSlotException.prototype.constructor = invalidTimeForSlotException

export default invalidTimeForSlotException
  
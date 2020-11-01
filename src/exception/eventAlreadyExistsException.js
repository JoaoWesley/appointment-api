import exceptionCode from '../commons/types/exceptionCode'

function eventAlreadyExistsException(message) {
  this.name = 'Event already exists'
  this.message = message || 'Event already exists'
  this.code = exceptionCode.EVENT_ALREADY_EXISTS
  this.stack = new Error().stack
}

eventAlreadyExistsException.prototype = Object.create(
  eventAlreadyExistsException.prototype
)
eventAlreadyExistsException.prototype.constructor = eventAlreadyExistsException

export default eventAlreadyExistsException

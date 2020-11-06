import moment from 'moment'
import { adminConnection } from '../config/database/firebaseAdminConfig'
const admin = adminConnection.connect()
const db = admin.firestore()

export const getEventsBetweenDates = async (startDate, endDate) => {
  const eventCollection = getEventCollection()

  const allEventsBetweenDatesRef = await eventCollection
    .where('startDateTime', '>=', startDate)
    .where('startDateTime', '<=', endDate)
    .get()

  if (allEventsBetweenDatesRef.empty) {
    return []
  }

  const allEventsBetweenDates = []
  allEventsBetweenDatesRef.forEach((doc) => {
    const event = {
      ...doc.data(),
      startDateTime: moment.utc(doc.data().startDateTime).format(),
      endDateTime: moment.utc(doc.data().endDateTime).format(),
    }
    allEventsBetweenDates.push(event)
  })
  return allEventsBetweenDates
}

export const save = async (startDateTime, duration, endDateTime) => {
  const eventCollection = getEventCollection()
  const eventCreated = await eventCollection.add({
    startDateTime,
    duration,
    endDateTime,
  })
  return { id: eventCreated.id }
}

export const checkIfEventExists = async (dateTime) => {
  const eventCollection = getEventCollection()

  //All events not finished
  const eventRef = await eventCollection
    .where('endDateTime', '>', dateTime)
    .get()

  const events = []

  eventRef.forEach((doc) => {
    //If Event is after dateTime
    if (moment.utc(doc.data().startDateTime).isAfter(moment.utc(dateTime))) {
      return
    }

    const event = {
      ...doc.data(),
      startDateTime: moment.utc(doc.data().startDateTime).format(),
      endDateTime: moment.utc(doc.data().endDateTime).format(),
    }
    events.push(event)
  })

  if (events.length === 0) {
    return false
  }

  return true
}

export const getEventCollection = () => {
  return db.collection('event')
}

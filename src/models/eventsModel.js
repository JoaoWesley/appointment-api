import moment from 'moment';
import { adminConnection } from '../config/database/firebaseAdminConfig'
const admin = adminConnection.connect()
const db = admin.firestore();


export const getEventsBetweenDates = async (startDate, endDate) => {
  const eventCollection = getEventCollection();

  const allEventsBetweenDatesRef = await eventCollection
    .where('dateTime', '>=', startDate)
    .where('dateTime', '<=', endDate).get();

  if (allEventsBetweenDatesRef.empty) {    
    return [];
  }  

  const allEventsBetweenDates = [];
  allEventsBetweenDatesRef.forEach((doc) => {
    const event = {
      ...doc.data(),
      dateTime: moment.utc(doc.data().dateTime).format()
    }    
    allEventsBetweenDates.push(event);
  });
  return allEventsBetweenDates
}

export const save = async (dateTime, duration) => {
  const eventCollection = getEventCollection();    
  const eventCreated =  await eventCollection.add({ dateTime, duration });  
  return { id: eventCreated.id };
}

export const checkIfEventExists = async (dateTime) => {
  const eventCollection = getEventCollection();  

  const eventRef = await eventCollection.where('dateTime', '==', dateTime).get();
  
  return !eventRef.empty
}

export const getEventCollection = () => {
  return db.collection('event');
}
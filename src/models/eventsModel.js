import moment from 'moment';
import { adminConnection } from '../config/database/firebaseAdminConfig'
const admin = adminConnection.connect()
const db = admin.firestore();


export const getEventsBetweenDates = async (startDate, endDate) => {
  const eventCollection = getEventCollection();

  const allEventsBetweenDatesRef = await eventCollection
    .where('dateTime', '>=', (new Date(startDate)))
    .where('dateTime', '<=', (new Date(endDate))).get();

  if (allEventsBetweenDatesRef.empty) {
    console.log('No matching documents.');
    return;
  }  

  const allEventsBetweenDates = [];
  allEventsBetweenDatesRef.forEach((doc) => {
    const event = {
      ...doc.data(),
      dateTime: doc.data().dateTime.toDate()
    }    
    allEventsBetweenDates.push(event);
  });
  return allEventsBetweenDates
}

export const save = async () => {
    const eventCollection = getEventCollection();    
    const setEventProperties = await eventCollection.add({});

}

export const getEventCollection = (email) => {
  return db.collection('event');
}
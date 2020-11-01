/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import * as eventsModel from '../../src/models/eventsModel'
import * as sinon from 'sinon'
import * as eventService from '../../src/services/eventService'
import moment from 'moment'
import * as momentTimezone from 'moment-timezone';
import appointmentConfig from '../../src/config/appointment-config'
import exceptionCode from '../../src/commons/types/exceptionCode'

describe('Event service', () => {
  it('Should get events', async () => {
    sinon.stub(eventsModel, 'getEventsBetweenDates').returns('result')
    const result = await eventService.getEvents('2019-10-10', '2020-11-02');
    expect(result).to.equal('result');
    eventsModel.getEventsBetweenDates.restore();
  })

  it('Should save and return', async () => {
    sinon.stub(eventsModel, 'checkIfEventExists').returns(false)
    sinon.stub(eventsModel, 'save').returns('result')
    sinon.stub(eventService, 'checkIfOutSideAvailableHours').returns(false)
    sinon.stub(eventService, 'checkIfIsInvalidTimeForSlot').returns(false)

    
    const result = await eventService.createEvent('2019-10-10');
    
    expect(result).to.equal('result');
    eventsModel.save.restore();
    eventsModel.checkIfEventExists.restore();
    eventService.checkIfOutSideAvailableHours.restore();
    eventService.checkIfIsInvalidTimeForSlot.restore();    
  })

  it('Should try save and return EVENT_ALREADY_EXISTS exception', async () => {
    sinon.stub(eventsModel, 'checkIfEventExists').returns(true)    

    try {
      const result = await eventService.createEvent('2019-10-10');
    } catch(error) {
      expect(error.code).to.equal(exceptionCode.EVENT_ALREADY_EXISTS);      
    }    
    eventsModel.checkIfEventExists.restore();    
  })

  it('Should try save and return OUTSIDE_AVAILABLE_HOURS exception', async () => {
    sinon.stub(eventsModel, 'checkIfEventExists').returns(false)    
    sinon.stub(eventService, 'checkIfOutSideAvailableHours').returns(true)  

    try {
      const result = await eventService.createEvent('2019-10-10');
    } catch(error) {
      expect(error.code).to.equal(exceptionCode.OUTSIDE_AVAILABLE_HOURS);      
    }    
    eventsModel.checkIfEventExists.restore();    
    eventService.checkIfOutSideAvailableHours.restore();    
  })

  it('Should try save and return INVALID_TIME_FOR_SLOT exception', async () => {
    sinon.stub(eventsModel, 'checkIfEventExists').returns(false)    
    sinon.stub(eventService, 'checkIfOutSideAvailableHours').returns(false)
    sinon.stub(eventService, 'checkIfIsInvalidTimeForSlot').returns(true)    

    try {
      const result = await eventService.createEvent('2019-10-10');
    } catch(error) {
      expect(error.code).to.equal(exceptionCode.INVALID_TIME_FOR_SLOT);      
    }    
    eventsModel.checkIfEventExists.restore();    
    eventService.checkIfOutSideAvailableHours.restore();
    eventService.checkIfIsInvalidTimeForSlot.restore();        
  })

  it('checkIfOutSideAvailableHours - Should Return false', () => {    
    const dateTimeWithConfigTimeZone = momentTimezone.tz(
      `2020-01-01 ${appointmentConfig.START_HOURS}`,
      appointmentConfig.TIMEZONE
    );

    const result = eventService.checkIfOutSideAvailableHours(dateTimeWithConfigTimeZone.format());
    expect(result).to.equal(false);    
  })

  it('checkIfOutSideAvailableHours - Should Return true', () => {        
    let dateTimeWithConfigTimeZone = momentTimezone.tz(
      `2020-01-01 ${appointmentConfig.START_HOURS}`,
      appointmentConfig.TIMEZONE
    );

    dateTimeWithConfigTimeZone = moment.utc(dateTimeWithConfigTimeZone).subtract(appointmentConfig.DURATION_IN_MINUTES, 'minutes');

    const result = eventService.checkIfOutSideAvailableHours(dateTimeWithConfigTimeZone.format());
    expect(result).to.equal(true);    
  })

  it('checkIfIsInvalidTimeForSlot - Should Return false', () => {        
    let dateTimeWithConfigTimeZone = momentTimezone.tz(
      `2020-01-01 ${appointmentConfig.START_HOURS}`,
      appointmentConfig.TIMEZONE
    );

    dateTimeWithConfigTimeZone = moment.utc(dateTimeWithConfigTimeZone).add(appointmentConfig.DURATION_IN_MINUTES, 'minutes');

    const result = eventService.checkIfIsInvalidTimeForSlot(dateTimeWithConfigTimeZone.format());
    expect(result).to.equal(false);    
  })

  it('checkIfIsInvalidTimeForSlot - Should Return false', () => {        
    let dateTimeWithConfigTimeZone = momentTimezone.tz(
      `2020-01-01 ${appointmentConfig.START_HOURS}`,
      appointmentConfig.TIMEZONE
    );

    dateTimeWithConfigTimeZone = moment.utc(dateTimeWithConfigTimeZone).add(appointmentConfig.DURATION_IN_MINUTES + 3, 'minutes');

    const result = eventService.checkIfIsInvalidTimeForSlot(dateTimeWithConfigTimeZone.format());
    expect(result).to.equal(true);    
  })
})

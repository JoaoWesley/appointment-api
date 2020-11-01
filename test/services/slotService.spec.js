/* eslint-env mocha */
/* eslint-disable no-unused-expressions */
import { expect } from 'chai'
import * as eventsModel from '../../src/models/eventsModel'
import * as sinon from 'sinon'
import * as slotService from '../../src/services/slotService'
import * as appointmentConfigService from '../../src/services/appointmentConfigService'
import moment from 'moment'

describe('Slot service', () => {
  it('Should get free Slots', async () => {
    sinon.stub(eventsModel, 'getEventsBetweenDates').returns([])
    sinon
      .stub(appointmentConfigService, 'getStartAndEndHoursFromDate')
      .returns({
        startHoursDateTimeUtc: moment.utc('2020-11-01T16:00:00Z'),
        endHoursDateTimeUtc: moment.utc('2020-11-02T01:00:00Z'),
      })

    const freeSlots = await slotService.getFreeSlots(
      '2020-11-01',
      'America/Sao_Paulo'
    )
    expect(freeSlots.length > 0).to.equal(true)
    eventsModel.getEventsBetweenDates.restore()
    appointmentConfigService.getStartAndEndHoursFromDate.restore()
  })
})

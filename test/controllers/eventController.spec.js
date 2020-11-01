/* eslint-env mocha */
/* eslint */
import HttpStatus from 'http-status-codes'
import * as sinon from 'sinon'
import eventsMock from '../mocks/eventsMock'
import * as eventController from '../../src/controllers/api/eventController'
import * as eventService from '../../src/services/eventService'

describe('Event controller', () => {
  it('[get events] should return 200  and json object', async () => {
    const req = {
      query: {
        startDate: '2019-10-10',
        endDate: '2020-11-02',
      },
    }
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    }

    sinon.stub(eventService, 'getEvents').returns(eventsMock)

    await eventController.getEvents(req, res)

    sinon.assert.calledWith(res.status, sinon.match(HttpStatus.OK))
    sinon.assert.calledOnce(res.status().json)
    eventService.getEvents.restore()
  })

  it('[get events - Invalid startDate] should return 422  and json object', async () => {
    const req = {
      query: {
        startDate: 'xx2019-10-10',
        endDate: '2020-11-02',
      },
    }
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    }

    sinon.stub(eventService, 'getEvents').returns(eventsMock)

    await eventController.getEvents(req, res)

    sinon.assert.calledWith(
      res.status,
      sinon.match(HttpStatus.UNPROCESSABLE_ENTITY)
    )
    sinon.assert.calledOnce(res.status().json)
    eventService.getEvents.restore()
  })

  it('[get events - Invalid endDate] should return 422  and json object', async () => {
    const req = {
      query: {
        startDate: '2019-10-10',
        endDate: 'xx2020-11-02',
      },
    }
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    }

    sinon.stub(eventService, 'getEvents').returns(eventsMock)

    await eventController.getEvents(req, res)

    sinon.assert.calledWith(
      res.status,
      sinon.match(HttpStatus.UNPROCESSABLE_ENTITY)
    )
    sinon.assert.calledOnce(res.status().json)
    eventService.getEvents.restore()
  })

  it('[post event] should return 200 and json object', async () => {
    const req = {
      body: { dateTime: '2020-02-01T20:30:00-03:00' },
    }

    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    }

    sinon.stub(eventService, 'createEvent').returns({ id: 'someId' })

    await eventController.postEvent(req, res)

    sinon.assert.calledWith(res.status, sinon.match(HttpStatus.OK))
    sinon.assert.calledOnce(res.status().json)
    eventService.createEvent.restore()
  })

  it('[post event - Invalid dateTime] should return 422 and json object', async () => {
    const req = {
      body: { dateTime: 'xxdsad2020-02-01T20:30:00-03:00' },
    }

    const res = {
      status: sinon.stub().returns({ json: sinon.spy() }),
    }

    sinon.stub(eventService, 'createEvent').returns({ id: 'someId' })

    await eventController.postEvent(req, res)

    sinon.assert.calledWith(
      res.status,
      sinon.match(HttpStatus.UNPROCESSABLE_ENTITY)
    )
    sinon.assert.calledOnce(res.status().json)
    eventService.createEvent.restore()
  })
})

/* eslint-env mocha */
/* eslint */
import HttpStatus from 'http-status-codes'
import * as sinon from 'sinon'
import slotsMock from '../mocks/slotsMock'
import * as slotController from '../../src/controllers/api/slotController'
import * as slotService from '../../src/services/slotService'

describe('Slot controller', () => {
  it('[get free slots] should return 200  and json object', async () => {
    const req = {
      query: {
        timeZone: 'America/Sao_Paulo',
        dateTime: '2020-11-01'
      }
    }
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() })
    }

    sinon
      .stub(slotService, 'getFreeSlots')
      .returns(slotsMock)

    await slotController.getFreeSlots(req, res)

    sinon.assert.calledWith(res.status, sinon.match(HttpStatus.OK))
    sinon.assert.calledOnce(res.status().json)
    slotService.getFreeSlots.restore()
  })  

  it('[get free slots - invalid timeZone] should return 200  and json object', async () => {
    const req = {
      query: {
        timeZone: null,
        dateTime: '2020-11-01'
      }
    }
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() })
    }

    sinon
      .stub(slotService, 'getFreeSlots')
      .returns(slotsMock)

    await slotController.getFreeSlots(req, res)

    sinon.assert.calledWith(res.status, sinon.match(HttpStatus.UNPROCESSABLE_ENTITY))
    sinon.assert.calledOnce(res.status().json)
    slotService.getFreeSlots.restore()
  })

  it('[get free slots - invalid dateTime] should return 200  and json object', async () => {
    const req = {
      query: {
        timeZone: 'America/Sao_Paulo',
        dateTime: null
      }
    }
    const res = {
      status: sinon.stub().returns({ json: sinon.spy() })
    }

    sinon
      .stub(slotService, 'getFreeSlots')
      .returns(slotsMock)

    await slotController.getFreeSlots(req, res)

    sinon.assert.calledWith(res.status, sinon.match(HttpStatus.UNPROCESSABLE_ENTITY))
    sinon.assert.calledOnce(res.status().json)
    slotService.getFreeSlots.restore()
  })  
})

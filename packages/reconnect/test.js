'use strict'

const test = require('ava')
const _reconnect = require('.')
const EventEmitter = require('events')

test('it schedule a reconnect when disconnect is emitted', t => {
  const entity = new EventEmitter()
  const reconnect = _reconnect(entity)

  reconnect.scheduleReconnect = () => {
    t.pass()
  }

  entity.emit('disconnect')
})

test('#reconnect', t => {
  const entity = new EventEmitter()
  const reconnect = _reconnect(entity)

  entity.status = 'foobar'
  entity.startOptions = {}

  entity.start = arg => {
    t.is(entity.status, 'offline')
    t.is(arg, entity.startOptions)
    return Promise.resolve()
  }

  return reconnect.reconnect().then(() => {
    t.is(entity.status, 'foobar')
  })
})

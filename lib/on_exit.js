'use strict'

const Promise = require('bluebird')
const debug = require('debug')('hf-util:on-exit')
const callbacks = []
let exiting = false

const EXIT_GRACE_PERIOD_MS = 3 * 1000 // wait for cancellations, etc

const onExit = (err, type) => {
  if (err) debug(err)
  if (exiting) return

  debug(`caught ${type}`)
  exiting = true

  if (callbacks.length === 0) {
    debug('clean exit')
    process.exit(0)
  }

  debug('pending exit promises, waiting...')

  setTimeout(() => {
    debug('exit grace period exceeded')
    process.exit(1)
  }, EXIT_GRACE_PERIOD_MS)

  Promise.each(callbacks, cb => cb()).then(() => {
    debug('clean exit')
    process.exit(0)
  }).catch((err) => {
    debug(err)
    process.exit(1)
  })
}

process.on('exit', (err) => onExit(err, 'exit'))
process.on('SIGINT', (err) => onExit(err, 'SIGINT'))
process.on('SIGUSR1', (err) => onExit(err, 'SIGUSR1'))
process.on('SIGUSR2', (err) => onExit(err, 'SIGUSR2'))
process.on('uncaughtException', (err) => onExit(err, 'uncaughtException'))

module.exports = function (cb, priority = 0) {
  cb._p = priority

  callbacks.push(cb)
  callbacks.sort((a, b) => b._p - a._p)
}

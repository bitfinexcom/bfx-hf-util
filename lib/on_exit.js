'use strict'

const Promise = require('bluebird')
const debug = require('debug')('bfx:hf:util:on-exit')
const callbacks = []
let exiting = false

const EXIT_GRACE_PERIOD_MS = 3 * 1000 // wait for cancellations, etc

const exitCallback = (err, type) => {
  if (err) debug(err)
  if (exiting) return

  debug(`caught ${type}`)
  exiting = true

  if (callbacks.length === 0) {
    debug('clean exit')
    process.exit(0) // eslint-disable-line
  }

  debug('pending exit promises, waiting...')

  setTimeout(() => {
    debug('exit grace period exceeded')
    process.exit(1) // eslint-disable-line
  }, EXIT_GRACE_PERIOD_MS)

  Promise.each(callbacks, cb => cb()).then(() => { // eslint-disable-line
    debug('clean exit')
    process.exit(0) // eslint-disable-line
  }).catch((err) => {
    debug(err)
    process.exit(1) // eslint-disable-line
  })
}

let listenersRegistered = false
const registerOnExitListeners = () => {
  if (listenersRegistered) {
    return
  }

  process.on('exit', (err) => exitCallback(err, 'exit'))
  process.on('SIGINT', (err) => exitCallback(err, 'SIGINT'))
  process.on('SIGUSR1', (err) => exitCallback(err, 'SIGUSR1'))
  process.on('SIGUSR2', (err) => exitCallback(err, 'SIGUSR2'))
  process.on('uncaughtException', (err) => exitCallback(err, 'uncaughtException'))

  listenersRegistered = true
}

/**
 * Registers a callback to be executed upon application exit (including
 * uncaught exceptions, SIGINT, SIGUSR1, SIGUSR2)
 *
 * @param {Function} cb - callback
 * @param {number} [priority=0] - callbacks are executed in descending priority
 *   order
 */
const onExit = (cb, priority = 0) => {
  cb._p = priority

  callbacks.push(cb)
  callbacks.sort((a, b) => b._p - a._p)

  if (!listenersRegistered) {
    registerOnExitListeners()
  }
}

module.exports = onExit

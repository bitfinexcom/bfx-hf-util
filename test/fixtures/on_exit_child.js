'use strict'

// Child process for test/on_exit.test.js: onExit ends the process itself
const { setTimeout: sleep } = require('node:timers/promises')
const onExit = require('../../lib/on_exit')

const SLOW_CALLBACK_MS = 20
const shouldFail = process.argv[2] === 'fail'

onExit(() => console.log('low'), 1)
onExit(async () => {
  await sleep(SLOW_CALLBACK_MS)
  console.log('high')
  if (shouldFail) throw new Error('callback failed')
}, 10)

process.emit('SIGINT')

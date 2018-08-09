'use strict'

const debug = require('debug')('hf:util:catch-uncaught')

// TODO: Remove from lib once unecessary (useful for debugging)
process.on('unhandledRejection', (reason, p) => {
  debug('unhandled rejection: %s (%s)', reason)
  console.log(p)
}).on('uncaughtException', err => {
  debug('uncaught exception: %s', err.stack)
  process.exit(1);
})

module.exports = {}
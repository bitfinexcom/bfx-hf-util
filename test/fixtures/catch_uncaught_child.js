'use strict'

// Child process for test/catch_uncaught_errors.test.js: throws past the handler
require('../../lib/catch_uncaught_errors')

const fail = () => {
  throw new Error('boom')
}

fail()

'use strict'

const _isError = require('lodash/isError')
const stackman = require('stackman')()

let logger = console.error

const onError = (incomingError) => {
  stackman.callsites(incomingError, (err, callsites) => {
    if (err) {
      throw err
    }

    callsites.forEach((cs, i) => {
      if (i === 0) {
        cs.sourceContext(10, (err, ctx) => {
          if (err) {
            return
          }

          logger('')
          logger('source from %s:%s', cs.getFileName(), cs.getLineNumber())
          logger(ctx.pre.join('\n'))
          logger('!!!')
          logger(ctx.line)
          logger('!!!')
          logger(ctx.post.join('\n'))
        })
      }

      logger(
        '! %s -> %s (%s) [%s:%s]',
        cs.getFunctionNameSanitized(), cs.getTypeNameSafely(),
        cs.getFileName(), cs.getLineNumber()
      )
    })
  })
}

process.on('unhandledRejection', (reason) => {
  logger('Unhandled rejection: %s', _isError(reason) ? reason.message : reason)
  onError(_isError(reason) ? reason : new Error(reason))
}).on('uncaughtException', err => {
  logger('Uncaught exception: %s', err.message)
  onError(err)
})

module.exports = {
  setLogger: l => { logger = l }
}

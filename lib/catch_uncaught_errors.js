'use strict'

const stackman = require('stackman')()

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

          console.info('')
          console.info('source from %s:%s', cs.getFileName(), cs.getLineNumber())
          console.info(ctx.pre.join('\n'))
          console.info('!!!')
          console.info(ctx.line)
          console.info('!!!')
          console.info(ctx.post.join('\n'))
        })
      }

      console.error(
        '! %s -> %s (%s) [%s:%d]',
        cs.getFunctionNameSanitized(), cs.getTypeNameSafely(),
        cs.getFileName(), cs.getLineNumber()
      )
    })
  })
}

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled rejection!')
  onError(reason instanceof Error ? reason : new Error(reason))
}).on('uncaughtException', err => {
  console.error('Uncaught exception!')
  onError(err)
})

module.exports = {}

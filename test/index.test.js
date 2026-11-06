'use strict'

const test = require('brittle')
const util = require('..')

test('exposes the public API', (t) => {
  const fns = [
    'alignRangeMts', 'chunksForRange', 'preprocessRemoteCandles',
    'candleWidth', 'onExit', 'rangeString'
  ]
  const datasets = [
    'timeFrames', 'SYMBOLS', 'CURRENCIES', 'TIME_FRAMES', 'WALLET_TYPES',
    'TIME_FRAME_WIDTHS'
  ]

  fns.forEach((name) => t.is(typeof util[name], 'function', name))
  datasets.forEach((name) => t.ok(util[name], name))
})

test('rangeString joins both dates with an arrow', (t) => {
  const from = new Date(0)
  const to = new Date(1000)

  t.is(
    util.rangeString(from, to),
    `${from.toLocaleString()} -> ${to.toLocaleString()}`
  )
})

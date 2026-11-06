'use strict'

// Alignment works on local time, so pin the zone to keep results stable
process.env.TZ = 'UTC'

const test = require('brittle')
const {
  alignRangeMts,
  candleWidth,
  chunksForRange,
  preprocessRemoteCandles
} = require('../lib/candles')

const MINUTE = 60 * 1000
const BASE_MTS = Date.UTC(2024, 0, 1)

test('candleWidth returns the width in ms, null when unknown', (t) => {
  t.is(candleWidth('1m'), MINUTE)
  t.is(candleWidth('1h'), 60 * MINUTE)
  t.is(candleWidth('2m'), null)
})

test('alignRangeMts rounds down to the time frame boundary', (t) => {
  const mts = Date.UTC(2024, 0, 1, 10, 7, 33, 120)

  t.is(alignRangeMts('5m', mts), Date.UTC(2024, 0, 1, 10, 5))
  t.is(alignRangeMts('1h', mts), Date.UTC(2024, 0, 1, 10))
  t.exception(() => alignRangeMts('xm', mts), /invalid alignment value/)
})

test('chunksForRange returns contiguous chunks covering the range', (t) => {
  const chunkSize = 5 * MINUTE
  const chunks = chunksForRange('1m', BASE_MTS, BASE_MTS + 10 * MINUTE, 5)

  t.alike(chunks, [
    { start: BASE_MTS, end: BASE_MTS + chunkSize },
    { start: BASE_MTS + chunkSize, end: BASE_MTS + 2 * chunkSize },
    { start: BASE_MTS + 2 * chunkSize, end: BASE_MTS + 3 * chunkSize }
  ])
})

test('chunksForRange rejects empty or inverted ranges', (t) => {
  t.exception(() => chunksForRange('1m', BASE_MTS, BASE_MTS + 1000, 5), /are the same/)
  t.exception(() => chunksForRange('1m', BASE_MTS + MINUTE, BASE_MTS, 5), /is after end/)
})

test('preprocessRemoteCandles fills gaps in array candles', (t) => {
  const candles = [
    [BASE_MTS, 1, 2, 3, 0.5, 10],
    [BASE_MTS + 3 * MINUTE, 2, 4, 5, 1, 20]
  ]

  t.alike(preprocessRemoteCandles('1m', candles), [
    candles[0],
    [BASE_MTS + MINUTE, 2, 2, 2, 2, 0],
    [BASE_MTS + 2 * MINUTE, 2, 2, 2, 2, 0],
    candles[1]
  ])
})

test('preprocessRemoteCandles fills gaps in transformed candles', (t) => {
  const candles = [
    { mts: BASE_MTS, open: 1, high: 3, low: 0.5, close: 2, volume: 10 },
    { mts: BASE_MTS + 2 * MINUTE, open: 2, high: 5, low: 1, close: 4, volume: 20 }
  ]

  t.alike(preprocessRemoteCandles('1m', candles, true), [
    candles[0],
    { mts: BASE_MTS + MINUTE, open: 2, high: 2, low: 2, close: 2, volume: 0 },
    candles[1]
  ])
})

test('preprocessRemoteCandles rejects unknown time frames', (t) => {
  t.exception(() => preprocessRemoteCandles('2m', []), /invalid time frame/)
})

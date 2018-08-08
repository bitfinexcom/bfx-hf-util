'use strict'

const _isFinite = require('lodash/isFinite')
const candleWidth = require('./width')

/**
 * Fills in gaps in candle data as returned by bfx; candles with no
 * trades are not returned by the API.
 *
 * Generated dummy candles have OHLC set to previous col, vol 0
 *
 * NOTE: Result size may exceed the fetch limit
 *
 * @param {string} tf - candle timeframe
 * @param {Array[]} candles - array of ws2/rest2 format candle data
 * @return {Array[]} consistentCandles
 */
module.exports = (tf, candles = []) => {
  const candleSize = candleWidth(tf)

  if (!_isFinite(candleSize)) {
    throw new Error('invalid time frame: %s', tf)
  }

  candles.sort((a, b) => a[0] - b[0]) // NOTE: maybe not required

  const consistentCandles = []
  let c

  for (let i = 0; i < candles.length; i += 1) {
    c = candles[i]
    consistentCandles.push(c)

    if (i === candles.length - 1) break
    if ((candles[i + 1][0] - c[0]) === candleSize) continue

    // Fill in candles with 0 vol
    let next = c[0] + candleSize

    while (next < candles[i + 1][0]) {
      consistentCandles.push([next, c[2], c[2], c[2], c[2], 0])
      next += candleSize
    }
  }

  return consistentCandles
}

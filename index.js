'use strict'

/**
 * This library hosts a set of utility functions used throughout the Bitfinex
 * Honey Framework & API Libraries.
 *
 * @license Apache-2.0
 * @module bfx-hf-util
 * @example
 * const { preprocessRemoteCandles } = require('bfx-hf-util')
 * const { RESTv2 } = require('bfx-api-node-rest')
 *
 * const rest = new RESTv2()
 * const candles = await rest.candles({
 *   timeframe: '1m',
 *   symbol: 'tBTCUSD',
 *   query: {
 *     start: Date.now() - (24 * 60 * 60 * 1000),
 *     end: Date.now(),
 *     sort: 1,
 *   }
 * })
 *
 * // Fill in empty candles to generate a consistent dataset
 * const processedCandles = preprocessRemoteCandles('1m', candles)
 *
 * // Do something with data
 * processCandles.forEach(candle => console.log(JSON.stringify(candle)))
 */

module.exports = require('./lib')

'use strict'

/**
 * Candle time frame widths in ms
 *
 * @memberof module:bfx-hf-util
 * @enum {number}
 * @constant
 * @readonly
 */
const TIME_FRAME_WIDTHS = {
  /** One Minute Candles */
  '1m': 60 * 1000,

  /** Five Minutes Candles */
  '5m': 5 * 60 * 1000,

  /** Fifteen Minutes Candles */
  '15m': 15 * 60 * 1000,

  /** Thirty Minutes Candles */
  '30m': 30 * 60 * 1000,

  /** One Hour Candles */
  '1h': 60 * 60 * 1000,

  /** Three Hour Candles */
  '3h': 3 * 60 * 60 * 1000,

  /** Six Hour Candles */
  '6h': 6 * 60 * 60 * 1000,

  /** Twelve Hour Candles */
  '12h': 12 * 60 * 60 * 1000,

  /** One Day Candles */
  '1D': 24 * 60 * 60 * 1000,

  /** Seven Day Candles */
  '7D': 7 * 24 * 60 * 60 * 1000,

  /** Fourteen Day Candles */
  '14D': 14 * 24 * 60 * 60 * 1000,

  /** One Month Candles */
  '1M': 30 * 24 * 60 * 60 * 1000
}

module.exports = TIME_FRAME_WIDTHS

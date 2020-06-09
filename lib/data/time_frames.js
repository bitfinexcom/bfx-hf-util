'use strict'

/**
 * Candle time frame string names
 *
 * @enum {string}
 * @constant
 * @readonly
 */
const TIME_FRAMES = {
  /** One Minute Candles */
  ONE_MINUTE: '1m',

  /** Five Minutes Candles */
  FIVE_MINUTES: '5m',

  /** Fifteen Minutes Candles */
  FIFTEEN_MINUTES: '15m',

  /** Thirty Minutes Candles */
  THIRTY_MINUTES: '30m',

  /** One Hour Candles */
  ONE_HOUR: '1h',

  /** Three Hour Candles */
  THREE_HOURS: '3h',

  /** Six Hour Candles */
  SIX_HOURS: '6h',

  /** Twelve Hour Candles */
  TWELVE_HOURS: '12h',

  /** One Day Candles */
  ONE_DAY: '1D',

  /** Seven Day Candles */
  SEVEN_DAYS: '7D',

  /** Fourteen Day Candles */
  FOURTEEN_DAYS: '14D',

  /** One Month Candles */
  ONE_MONTH: '1M'
}

module.exports = TIME_FRAMES

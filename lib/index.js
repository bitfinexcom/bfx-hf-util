const candles = require('./candles')
const onExit = require('./on_exit')
const rangeString = require('./range_string')
const SYMBOLS = require('./data/symbols')
const CURRENCIES = require('./data/currencies')
const TIME_FRAMES = require('./data/time_frames')
const WALLET_TYPES = require('./data/wallet_types')
const TIME_FRAME_WIDTHS = require('./candles/time_frames')

module.exports = {
  ...candles,
  onExit,
  rangeString,

  SYMBOLS,
  CURRENCIES,
  TIME_FRAMES,
  WALLET_TYPES,
  TIME_FRAME_WIDTHS
}

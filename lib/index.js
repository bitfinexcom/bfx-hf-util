// @create-index

const candles = require('./candles')
const onExit = require('./on_exit')
const rangeString = require('./range_string')
const SYMBOLS = require('./data/symbols')
const TIME_FRAMES = require('./data/time_frames')

module.exports = {
  ...candles,
  onExit,
  rangeString,

  SYMBOLS,
  TIME_FRAMES
}

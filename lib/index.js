const candles = require('./candles')
const onExit = require('./on_exit')
const rangeString = require('./range_string')
const SYMBOLS = require('./data/symbols')
const TIME_FRAMES = require('./data/time_frames')
const TIME_FRAME_WIDTHS = require('./candles/time_frames')

module.exports = {
  ...candles,
  onExit,
  rangeString,

  SYMBOLS,
  TIME_FRAMES,
  TIME_FRAME_WIDTHS
}

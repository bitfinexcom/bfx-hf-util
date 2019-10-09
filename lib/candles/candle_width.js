'use strict'

const TIME_FRAMES = require('./time_frames')

/**
 * Returns the width of a candle time frame in ms
 *
 * @param {string} tf - candle time frame, i.e. '1m'
 * @return {number} width - null if time frame is invalid
 */
const candleWidth = tf => TIME_FRAMES[tf] || null

module.exports = candleWidth

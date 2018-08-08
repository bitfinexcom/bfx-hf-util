'use strict'

const TIME_FRAMES = require('./time_frames')

module.exports = tf => TIME_FRAMES[tf] || null

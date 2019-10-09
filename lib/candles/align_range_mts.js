'use strict'

const _last = require('lodash/last')
const _isFinite = require('lodash/isFinite')

/**
 * Rounds the timestamp to the nearest 1m/5m/1h/etc (0 sec & 0 ms)
 *
 * @param {string} tf - candle time frame to use for alignment
 * @param {number} mts
 * @return {number} aligned - rounded to nearest candle width
 */
const alignRangeMTS = (tf = '', mts) => {
  const alignedMTS = new Date(mts)
  const suffix = _last(tf)
  const alignTo = Number(tf.substring(0, tf.length - 1))

  if (!_isFinite(alignTo)) {
    throw new Error('invalid alignment value: %s [%s]', alignTo, tf)
  }

  alignedMTS.setSeconds(0) // no sec granularity
  alignedMTS.setMilliseconds(0)

  if (suffix === 'm') {
    const min = alignedMTS.getMinutes()
    alignedMTS.setMinutes(min - (min % alignTo))
  } else if (suffix === 'h') {
    alignedMTS.setMinutes(0)

    const hours = alignedMTS.getHours()
    alignedMTS.setHours(hours - (hours % alignTo))
  } else if (suffix === 'D') {
    alignedMTS.setHours(0)

    const date = alignedMTS.getDate()
    alignedMTS.setDate(date - (date % alignTo))
  } else if (suffix === 'M') {
    alignedMTS.setDate(1)
    const month = alignedMTS.getMonth()
    alignedMTS.setMonth(month - (month % alignTo))
  }

  return Number(alignedMTS)
}

module.exports = alignRangeMTS

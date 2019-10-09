'use strict'

/**
 * Generates a locale-formatted string describing a date range
 *
 * @param {number|string|Date} from
 * @param {number|string|Date} to
 * @return {string} range
 */
const genRangeString = (f, t) => {
  return `${new Date(f).toLocaleString()} -> ${new Date(t).toLocaleString()}`
}

module.exports = genRangeString

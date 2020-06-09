'use strict'

/**
 * Generates a locale-formatted string describing a date range
 *
 * @param {number|string|Date} start - start timestamp
 * @param {number|string|Date} end - end timestamp
 * @returns {string} range
 */
const rangeString = (start, end) => (
  `${new Date(start).toLocaleString()} -> ${new Date(end).toLocaleString()}`
)

module.exports = rangeString

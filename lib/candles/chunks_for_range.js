'use strict'

const candleWidth = require('./candle_width')
const alignRangeMTS = require('./align_range_mts')

/**
 * Returns a set of aligned chunks covering the specified range; the chunks will
 * almost always start before & end beyond the range.
 *
 * @param {string} tf
 * @param {number} start
 * @param {number} end
 * @param {number} candlesPerChunk
 * @return {Object[]} chunks
 */
const chunksForRange = (tf, from, to, candlesPerChunk) => {
  const start = alignRangeMTS(tf, from)
  const end = alignRangeMTS(tf, to)

  if (start === end) {
    throw new Error(`aligned start/end are the same! ${start}`)
  } else if (start > end) {
    throw new Error(`aligned start is after end: ${start} > ${end}`)
  }

  // Calc total chunk size in ms
  const tfSize = candleWidth(tf)
  const chunkSize = candlesPerChunk * tfSize
  const chunks = []
  let currentChunkStart = start - (start % chunkSize) // initial chunk start
  let currentChunkEnd = currentChunkStart + chunkSize

  while (true) {
    chunks.push({
      start: currentChunkStart,
      end: currentChunkEnd
    })

    if (currentChunkEnd > end) {
      break
    }

    currentChunkStart = currentChunkEnd
    currentChunkEnd += chunkSize // note, will be beyond 'end' for 1 loop
  }

  return chunks
}

module.exports = chunksForRange

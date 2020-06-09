'use strict'

const _uniq = require('lodash/uniq')
const _flatten = require('lodash/flatten')
const SYMBOLS = require('./symbols')

const CURRENCY_LIST = _uniq(_flatten(Object
  .values(SYMBOLS)
  .map(s => [s.substring(1, 4), s.substring(4)])))

/**
 * Map of **Bitfinex** currency names (values identical to keys)
 *
 * @enum {string}
 * @constant
 * @readonly
 */
const CURRENCIES = {}

CURRENCY_LIST.forEach(ccy => {
  CURRENCIES[ccy] = ccy
})

CURRENCIES.UST = 'UST'

module.exports = CURRENCIES

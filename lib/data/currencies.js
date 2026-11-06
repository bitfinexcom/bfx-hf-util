'use strict'

const SYMBOLS = require('./symbols')

const CURRENCY_LIST = [...new Set(Object
  .values(SYMBOLS)
  .map(s => [s.substring(1, 4), s.substring(4)])
  .flat())]

const CURRENCIES = {}

CURRENCY_LIST.forEach(ccy => {
  CURRENCIES[ccy] = ccy
})

CURRENCIES.UST = 'UST'

module.exports = CURRENCIES

## Bitfinex Honey Framework Utilities

[![Build Status](https://travis-ci.org/bitfinexcom/bfx-hf-util.svg?branch=master)](https://travis-ci.org/bitfinexcom/bfx-hf-util)

This library hosts a set of utility functions used throughout the Bitfinex Honey Framework & API Libraries.

### Features

* Logic for processing Bitfinex candle data
* Helper for catching uncaught errors (`require('bfx-hf-util/lib/catch_uncaught_errors)`)

### Installation

```bash
npm i --save bfx-hf-util
```

### Quickstart

```js
const { preprocessRemoteCandles } = require('bfx-hf-util')
const { RESTv2 } = require('bfx-api-node-rest')

const rest = new RESTv2()
const candles = await rest.candles({
  timeframe: '1m',
  symbol: 'tBTCUSD',
  query: {
    start: Date.now() - (24 * 60 * 60 * 1000),
    end: Date.now(),
    sort: 1,
  }
})

// Fill in empty candles to generate a consistent dataset
const processedCandles = preprocessRemoteCandles('1m', candles)

// Do something with data
processCandles.forEach(candle => console.log(JSON.stringify(candle)))
```

### Docs

For JSDoc-generated API documentation, [refer to `docs/api.md`](/docs/api.md)

### Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

### Note

This package will be maintained only via github, please use latest relases from github instead of npm.

Example on how to install specific version from github:
```
npm i --save-prod https://github.com/bitfinexcom/bfx-hf-util.git#v1.0.11
```

Example on how to install it latest version from github:
```
npm i --save-prod https://github.com/bitfinexcom/bfx-hf-util.git
```

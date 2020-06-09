## Modules

<dl>
<dt><a href="#module_bfx-hf-util">bfx-hf-util</a></dt>
<dd><p>This library hosts a set of utility functions used throughout the Bitfinex
Honey Framework &amp; API Libraries.</p>
</dd>
</dl>

## Constants

<dl>
<dt><a href="#WALLET_TYPES">WALLET_TYPES</a> : <code>Array.&lt;string&gt;</code></dt>
<dd><p>Array of valid wallet types</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#alignRangeMTS">alignRangeMTS(tf, mts)</a> ⇒ <code>number</code></dt>
<dd><p>Rounds the timestamp to the nearest 1m/5m/1h/etc (0 sec &amp; 0 ms)</p>
</dd>
<dt><a href="#candleWidth">candleWidth(tf)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the width of a candle time frame in ms</p>
</dd>
<dt><a href="#chunksForRange">chunksForRange(tf, start, end, candlesPerChunk)</a> ⇒ <code>Array.&lt;object&gt;</code></dt>
<dd><p>Returns a set of aligned chunks covering the specified range; the chunks will
almost always start before &amp; end beyond the range.</p>
</dd>
<dt><a href="#preprocessRemoteCandles">preprocessRemoteCandles(tf, candles, transformed)</a> ⇒ <code>Array</code></dt>
<dd><p>Fills in gaps in candle data as returned by bfx; candles with no
trades are not returned by the API.</p>
<p>Generated dummy candles have OHLC set to previous col, vol 0</p>
<p>NOTE: Result size may exceed the fetch limit</p>
</dd>
<dt><a href="#onExit">onExit(cb, [priority])</a></dt>
<dd><p>Registers a callback to be executed upon application exit (including
uncaught exceptions, SIGINT, SIGUSR1, SIGUSR2)</p>
</dd>
<dt><a href="#rangeString">rangeString(start, end)</a> ⇒ <code>string</code></dt>
<dd><p>Generates a locale-formatted string describing a date range</p>
</dd>
</dl>

<a name="module_bfx-hf-util"></a>

## bfx-hf-util
This library hosts a set of utility functions used throughout the Bitfinex
Honey Framework & API Libraries.

**License**: Apache-2.0  
**Example**  
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
<a name="TIME_FRAME_WIDTHS"></a>

## TIME\_FRAME\_WIDTHS : <code>enum</code>
Candle time frame widths in ms

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| 1m | <code>number</code> | <code></code> | One Minute Candles |
| 5m | <code>number</code> | <code></code> | Five Minutes Candles |
| 15m | <code>number</code> | <code></code> | Fifteen Minutes Candles |
| 30m | <code>number</code> | <code></code> | Thirty Minutes Candles |
| 1h | <code>number</code> | <code></code> | One Hour Candles |
| 3h | <code>number</code> | <code></code> | Three Hour Candles |
| 6h | <code>number</code> | <code></code> | Six Hour Candles |
| 12h | <code>number</code> | <code></code> | Twelve Hour Candles |
| 1D | <code>number</code> | <code></code> | One Day Candles |
| 7D | <code>number</code> | <code></code> | Seven Day Candles |
| 14D | <code>number</code> | <code></code> | Fourteen Day Candles |
| 1M | <code>number</code> | <code></code> | One Month Candles |

<a name="CURRENCIES"></a>

## CURRENCIES : <code>enum</code>
Map of **Bitfinex** currency names (values identical to keys)

**Kind**: global enum  
**Read only**: true  
<a name="SYMBOLS"></a>

## SYMBOLS : <code>enum</code>
Map of active **Bitfinex** market names, keys having `_` seperators which
are omitted from values.

**Kind**: global enum  
**Read only**: true  
<a name="TIME_FRAMES"></a>

## TIME\_FRAMES : <code>enum</code>
Candle time frame string names

**Kind**: global enum  
**Read only**: true  
**Properties**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| ONE_MINUTE | <code>string</code> | <code>&quot;1m&quot;</code> | One Minute Candles |
| FIVE_MINUTES | <code>string</code> | <code>&quot;5m&quot;</code> | Five Minutes Candles |
| FIFTEEN_MINUTES | <code>string</code> | <code>&quot;15m&quot;</code> | Fifteen Minutes Candles |
| THIRTY_MINUTES | <code>string</code> | <code>&quot;30m&quot;</code> | Thirty Minutes Candles |
| ONE_HOUR | <code>string</code> | <code>&quot;1h&quot;</code> | One Hour Candles |
| THREE_HOURS | <code>string</code> | <code>&quot;3h&quot;</code> | Three Hour Candles |
| SIX_HOURS | <code>string</code> | <code>&quot;6h&quot;</code> | Six Hour Candles |
| TWELVE_HOURS | <code>string</code> | <code>&quot;12h&quot;</code> | Twelve Hour Candles |
| ONE_DAY | <code>string</code> | <code>&quot;1D&quot;</code> | One Day Candles |
| SEVEN_DAYS | <code>string</code> | <code>&quot;7D&quot;</code> | Seven Day Candles |
| FOURTEEN_DAYS | <code>string</code> | <code>&quot;14D&quot;</code> | Fourteen Day Candles |
| ONE_MONTH | <code>string</code> | <code>&quot;1M&quot;</code> | One Month Candles |

<a name="WALLET_TYPES"></a>

## WALLET\_TYPES : <code>Array.&lt;string&gt;</code>
Array of valid wallet types

**Kind**: global constant  
**Read only**: true  
<a name="alignRangeMTS"></a>

## alignRangeMTS(tf, mts) ⇒ <code>number</code>
Rounds the timestamp to the nearest 1m/5m/1h/etc (0 sec & 0 ms)

**Kind**: global function  
**Returns**: <code>number</code> - aligned - rounded to nearest candle width  

| Param | Type | Description |
| --- | --- | --- |
| tf | <code>string</code> | candle time frame to use for alignment |
| mts | <code>number</code> |  |

<a name="candleWidth"></a>

## candleWidth(tf) ⇒ <code>number</code>
Returns the width of a candle time frame in ms

**Kind**: global function  
**Returns**: <code>number</code> - width - null if time frame is invalid  

| Param | Type | Description |
| --- | --- | --- |
| tf | <code>string</code> | candle time frame, i.e. '1m' |

<a name="chunksForRange"></a>

## chunksForRange(tf, start, end, candlesPerChunk) ⇒ <code>Array.&lt;object&gt;</code>
Returns a set of aligned chunks covering the specified range; the chunks will
almost always start before & end beyond the range.

**Kind**: global function  
**Returns**: <code>Array.&lt;object&gt;</code> - chunks  

| Param | Type | Description |
| --- | --- | --- |
| tf | <code>string</code> | time frame |
| start | <code>number</code> | start timestamp |
| end | <code>number</code> | end timestamp |
| candlesPerChunk | <code>number</code> | number of candles per chunk |

<a name="preprocessRemoteCandles"></a>

## preprocessRemoteCandles(tf, candles, transformed) ⇒ <code>Array</code>
Fills in gaps in candle data as returned by bfx; candles with no
trades are not returned by the API.

Generated dummy candles have OHLC set to previous col, vol 0

NOTE: Result size may exceed the fetch limit

**Kind**: global function  
**Returns**: <code>Array</code> - consistentCandles  

| Param | Type | Description |
| --- | --- | --- |
| tf | <code>string</code> | candle timeframe |
| candles | <code>bfx-api-node-models.Candle</code> \| <code>bfx-api-node-models.Candle~Data</code> | array of ws2/rest2 format candle data |
| transformed | <code>boolean</code> | indicates if the dataset is transformed |

<a name="onExit"></a>

## onExit(cb, [priority])
Registers a callback to be executed upon application exit (including
uncaught exceptions, SIGINT, SIGUSR1, SIGUSR2)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cb | <code>function</code> |  | callback |
| [priority] | <code>number</code> | <code>0</code> | callbacks are executed in descending priority   order |

<a name="rangeString"></a>

## rangeString(start, end) ⇒ <code>string</code>
Generates a locale-formatted string describing a date range

**Kind**: global function  
**Returns**: <code>string</code> - range  

| Param | Type | Description |
| --- | --- | --- |
| start | <code>number</code> \| <code>string</code> \| <code>Date</code> | start timestamp |
| end | <code>number</code> \| <code>string</code> \| <code>Date</code> | end timestamp |


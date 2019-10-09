## Functions

<dl>
<dt><a href="#registerExitCallback">registerExitCallback(cb, priority)</a></dt>
<dd><p>Registers a callback to be executed upon application exit (including
uncaught exceptions, SIGINT, SIGUSR1, SIGUSR2)</p>
</dd>
<dt><a href="#genRangeString">genRangeString(from, to)</a> ⇒ <code>string</code></dt>
<dd><p>Generates a locale-formatted string describing a date range</p>
</dd>
<dt><a href="#alignRangeMTS">alignRangeMTS(tf, mts)</a> ⇒ <code>number</code></dt>
<dd><p>Rounds the timestamp to the nearest 1m/5m/1h/etc (0 sec &amp; 0 ms)</p>
</dd>
<dt><a href="#candleWidth">candleWidth(tf)</a> ⇒ <code>number</code></dt>
<dd><p>Returns the width of a candle time frame in ms</p>
</dd>
<dt><a href="#chunksForRange">chunksForRange(tf, start, end, candlesPerChunk)</a> ⇒ <code>Array.&lt;Object&gt;</code></dt>
<dd><p>Returns a set of aligned chunks covering the specified range; the chunks will
almost always start before &amp; end beyond the range.</p>
</dd>
<dt><a href="#preprocessRemoteCandles">preprocessRemoteCandles(tf, candles, transformed)</a> ⇒ <code>Array.&lt;Array&gt;</code></dt>
<dd><p>Fills in gaps in candle data as returned by bfx; candles with no
trades are not returned by the API.</p>
<p>Generated dummy candles have OHLC set to previous col, vol 0</p>
<p>NOTE: Result size may exceed the fetch limit</p>
</dd>
</dl>

<a name="registerExitCallback"></a>

## registerExitCallback(cb, priority)
Registers a callback to be executed upon application exit (including
uncaught exceptions, SIGINT, SIGUSR1, SIGUSR2)

**Kind**: global function  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| cb | <code>function</code> |  |  |
| priority | <code>number</code> | <code>0</code> | callbacks are executed in descending priority order |

<a name="genRangeString"></a>

## genRangeString(from, to) ⇒ <code>string</code>
Generates a locale-formatted string describing a date range

**Kind**: global function  
**Returns**: <code>string</code> - range  

| Param | Type |
| --- | --- |
| from | <code>number</code> \| <code>string</code> \| <code>Date</code> | 
| to | <code>number</code> \| <code>string</code> \| <code>Date</code> | 

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

## chunksForRange(tf, start, end, candlesPerChunk) ⇒ <code>Array.&lt;Object&gt;</code>
Returns a set of aligned chunks covering the specified range; the chunks will
almost always start before & end beyond the range.

**Kind**: global function  
**Returns**: <code>Array.&lt;Object&gt;</code> - chunks  

| Param | Type |
| --- | --- |
| tf | <code>string</code> | 
| start | <code>number</code> | 
| end | <code>number</code> | 
| candlesPerChunk | <code>number</code> | 

<a name="preprocessRemoteCandles"></a>

## preprocessRemoteCandles(tf, candles, transformed) ⇒ <code>Array.&lt;Array&gt;</code>
Fills in gaps in candle data as returned by bfx; candles with no
trades are not returned by the API.

Generated dummy candles have OHLC set to previous col, vol 0

NOTE: Result size may exceed the fetch limit

**Kind**: global function  
**Returns**: <code>Array.&lt;Array&gt;</code> - consistentCandles  

| Param | Type | Description |
| --- | --- | --- |
| tf | <code>string</code> | candle timeframe |
| candles | <code>Array.&lt;Array&gt;</code> \| <code>Array.&lt;Candle&gt;</code> | array of ws2/rest2 format candle data |
| transformed | <code>boolean</code> | indicates if the dataset is transformed |


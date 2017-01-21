<a name="module_rfft"></a>

## rfft
> real split radix FFT algorithm

[![npm install dsp-rfft](https://nodei.co/npm/dsp-rfft.png?mini=true)](https://npmjs.org/package/dsp-rfft/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

Most of the code was adapted from [dsp.js](https://github.com/corbanbrook/dsp.js)
by @corbanbrook and some parts by @Spudd86

### References

- Original C implementation at http://www.jjj.de/fxt/

**Example**  
```js
const dsp = require('dsp-kit')
const forward = dsp.rfft(1024)
const result = forward(signal)
```
<a name="module_rfft.rfft"></a>

### rfft.rfft(buffer) ⇒
Performs a forward transform on the sample buffer.
Converts a time domain signal to frequency domain spectra.

**Kind**: static method of <code>[rfft](#module_rfft)</code>  
**Returns**: The frequency spectrum array  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Array</code> | The sample buffer. Buffer Length must be power of 2 |


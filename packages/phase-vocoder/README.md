<a name="module_phase-vocoder"></a>

## phase-vocoder
> Phase-vocoder timestretch algorithm

Time stretching means altering the duration of a signal without changing its pitch

[![npm install dsp-phase-vocoder](https://nodei.co/npm/dsp-phase-vocoder.png?mini=true)](https://npmjs.org/package/dsp-phase-vocoder/)

The essential idea is to build two fnctions (analyze and
synthesize) which are intended to work as a tightly coupled set. Between
these two function calls, however, any number of manipulations can be
performed to obtain the desired effects

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

### References

- https://www.spsc.tugraz.at/sites/default/files/Bachelor%20Thesis%20Gruenwald.pdf

**Example**  
```js
var dsp = require('dsp-kit')
```

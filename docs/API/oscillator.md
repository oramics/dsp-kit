<a name="module_oscillator"></a>

## oscillator
> Wavetable oscillators

[![npm install dsp-oscillator](https://nodei.co/npm/dsp-oscillator.png?mini=true)](https://npmjs.org/package/dsp-oscillator/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

### References

- http://www.earlevel.com/main/2012/05/09/a-wavetable-oscillator%E2%80%94part-3/
- http://www.earlevel.com/main/2012/05/25/a-wavetable-oscillator%E2%80%94the-code/
- https://github.com/OpenDAWN/wavetable

**Example**  
```js
const oscillator = require('dsp-oscillator')
```
<a name="module_oscillator.oscillator"></a>

### oscillator.oscillator(params)
Create an oscillator. Returns a function that generates the oscillator
signal

**Kind**: static method of <code>[oscillator](#module_oscillator)</code>  

| Param | Type | Description |
| --- | --- | --- |
| params | <code>Object</code> | oscillator parameters: - type: one of 'sine' - sampleRate: 44100 by default - defaultSize: the length of the generated buffer |


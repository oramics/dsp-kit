<a name="module_window"></a>

## window
> Windowing functions for digital signal processing

[![npm install dsp-window](https://nodei.co/npm/dsp-window.png?mini=true)](https://npmjs.org/package/dsp-window/)


All window functions have some extra properties:

- rov: recommended overlap

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
const dsp = require('dsp-kit')
dsp.generate(1024, dsp.window.hanning())
```

* [window](#module_window)
    * [.rectangular](#module_window.rectangular)
    * [.hanning](#module_window.hanning)
    * [.blackmanHarris](#module_window.blackmanHarris)

<a name="module_window.rectangular"></a>

### window.rectangular
The rectangular window, also sometimes called ‘uniform window’, is given by
w = 1, equivalent to using no window at all.
Although there are some special applications where the rectangular
window is advantageous, it is probably not useful for any of our applications

- recommended overlap: 50%

**Kind**: static constant of <code>[window](#module_window)</code>  
<a name="module_window.hanning"></a>

### window.hanning
The Hanning window (one of a family of ‘raised cosine’ windows) is also known
as ‘Hann window’. Do not confuse it with the ‘Hamming’ window.

**Kind**: static constant of <code>[window](#module_window)</code>  
<a name="module_window.blackmanHarris"></a>

### window.blackmanHarris
The Blackman-Harris window is one of a family of window functions given by a
sum of cosine terms. By varying the number and coefficients of the terms
different characteristics can be optimized.

**Kind**: static constant of <code>[window](#module_window)</code>  

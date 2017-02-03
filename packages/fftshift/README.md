<a name="module_fftshift"></a>

## fftshift
> Cyclic rotation for phase-zero windowing

[![npm install dsp-fftshift](https://nodei.co/npm/dsp-fftshift.png?mini=true)](https://npmjs.org/package/dsp-fftshift/)

This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

**Example**  
```js
var shift = require('dsp-fftshift')
shift.fftshift(signal)
shift.ifftshift(signal)
```
**Example**  
```js
// ES6 syntax
import { fftshift, ifftshift } from 'dsp-fftshift'
fftshift(signal)
```
**Example**  
```js
// included in dsp-kit package
var dsp = require('dsp-kit')
dsp.fftshift(signal)
dsp.ifftshift(signal)
```

* [fftshift](#module_fftshift)
    * [.fftshift(buffer)](#module_fftshift.fftshift) ⇒ <code>Array</code>
    * [.ifftshift(buffer)](#module_fftshift.ifftshift) ⇒ <code>Array</code>

<a name="module_fftshift.fftshift"></a>

### fftshift.fftshift(buffer) ⇒ <code>Array</code>
Zero-phase windowing alignment

__CAUTION__: this function mutates the array

Perform a cyclic shifting (rotation) to set the first sample at the middle
of the buffer (it reorder buffer samples from (0:N-1) to [(N/2:N-1) (0:(N/2-1))])

Named by the same function in mathlab: `fftshift`

**Kind**: static method of <code>[fftshift](#module_fftshift)</code>  
**Returns**: <code>Array</code> - the same buffer (with the data rotated)  

| Param | Type |
| --- | --- |
| buffer | <code>Array</code> | 

<a name="module_fftshift.ifftshift"></a>

### fftshift.ifftshift(buffer) ⇒ <code>Array</code>
Inverse of zero-phase windowing alignment

__CAUTION__: this function mutates the array

**Kind**: static method of <code>[fftshift](#module_fftshift)</code>  
**Returns**: <code>Array</code> - the same buffer (with the data rotated)  
**See**: fftshift  

| Param | Type |
| --- | --- |
| buffer | <code>Array</code> | 


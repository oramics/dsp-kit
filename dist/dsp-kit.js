(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * > Array buffer manipulation functions
 *
 * [![npm install dsp-buffer](https://nodei.co/npm/dsp-buffer.png?mini=true)](https://npmjs.org/package/dsp-buffer/)
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * var dsp = require('dsp-kit')
 * dsp.generate(...)
 *
 * @example
 * // require only this module
 * var buffer = require('dsp-buffer')
 * const sine = buffer.generate(1024, (x) => Math.sin(0.5 * x))
 *
 * @module buffer
 */

/**
 * Create a buffer (a Float64Array) filled with zeros
 *
 * @param {Integer} size
 * @return {Array} the buffer
 */
function zeros (size) { return new Float64Array(size) }

/**
 * Create a buffer from an array (an alias for Float64Array.from)
 */
const from = Float64Array.from.bind(Float64Array);

/**
 * Generate a buffer using a function
 *
 * @param {Number|Array} buffer - The buffer (to reuse) or a buffer length to create one
 * @param {Function} fn - the generator function. It receives the following parameters:
 *
 * - n: a number from [0..1]
 * - index: a number from [0...length]
 * - length: the buffer length
 * @example
 * const sine = buffer.generate(10, (x) => Math.sin(x))
 */
function generate (buffer, fn) {
  if (typeof buffer === 'number') buffer = zeros(buffer);
  const size = buffer.length;
  for (let i = 0; i < size; i++) buffer[i] = fn(i / size, i, size);
  return buffer
}

/**
 * Concatenate two buffers
 * @param {Array} bufferA
 * @param {Array} bufferB
 * @param {Array} destination - (Optional) If provided, the length must be
 * _at least_ the sum of the bufferA and bufferB length plus the destOffset
 * @return {Array} destination
 * @example
 * // concat into a new buffer
 * const bufferC = buffer.concat(bufferA, bufferB)
 */
function concat (a, b, dest = null, offset = 0) {
  const al = a.length;
  const bl = b.length;
  if (dest === null) dest = zeros(al + bl + offset);
  for (let i = 0; i < al; i++) dest[i + offset] = a[i];
  for (let i = 0; i < bl; i++) dest[i + al + offset] = b[i];
  return dest
}

/**
 * Create a buffer combinator. Given a function, returns a function to combine
 * two buffers using that function.
 *
 * @param {Function} fn - the function used to combine the buffers. It accepts
 * two parameters: the numbers of each buffer to combine
 * @return {Function} the combinator function
 * @see copyTo, add, mult
 */
function combinator (fn) {
  return function (bufferA, bufferB, dest = null, offsetA = 0, offsetB = 0, offsetD = 0) {
    const bufferD = typeof dest === 'number' ? zeros(dest)
      : dest === null ? zeros(Math.min(bufferA.length - offsetA, bufferB.length - offsetB) + offsetD)
      : dest;
    const max = bufferD.length;
    for (let i = 0; i < max; i++) {
      bufferD[i + offsetD] = fn(bufferA[i + offsetA], bufferB[i + offsetB]);
    }
    return bufferD
  }
}

const copyTo = combinator((a, b) => a);
/**
 * Copy a buffer
 * @param {Array} source
 * @param {Array} destination - (Optional)
 * @return {Array} destination
 */
function copy (src, dest, srcOffset, destOffset) {
  return copyTo(src, src, dest, srcOffset, srcOffset, destOffset)
}

/**
 * Add two buffers.
 *
 * @param {Array} bufferA - the source buffer
 * @param {Array} bufferB - the B buffer
 * @param {Array|Integer} destination - (Optional) the destination buffer or the
 * number of samples to add. If not present, a new buffer is created.
 * @param {Integer} offsetA - the start offset of the A buffer
 * @param {Integer} offsetA - the start offset of the B buffer
 * @param {Integer} offsetDestination - the start offset of the destination buffer
 * @return {Array} the destination buffer (the provided or a new one if no one provided)
 *
 * @example
 * // add to buffers into a new one
 * const result = buffer.add(bufferA, bufferB)
 *
 * @example
 * // add to buffers into a third
 * buffer.add(bufferA, bufferB, dest)
 */
const add = combinator((a, b) => a + b);

/**
 * Multiply two buffers.
 *
 * @param {Array} bufferA - the source buffer
 * @param {Array} bufferB - the B buffer
 * @param {Array|Integer} destination - (Optional) the destination buffer or the
 * number of samples to add. If not present, a new buffer is created.
 * @param {Integer} offsetA - the start offset of the A buffer
 * @param {Integer} offsetA - the start offset of the B buffer
 * @param {Integer} offsetDestination - the start offset of the destination buffer
 *
 * @example
 * // add to buffers into a new one
 * const result = buffer.add(bufferA, bufferB)
 *
 * @example
 * // add to buffers into a third
 * buffer.add(bufferA, bufferB, dest)
 */
const mult = combinator((a, b) => a * b);


/**
 * Map a buffer with a function
 *
 * This function can be partially applied (see examples)
 *
 * @param {Function} fn - the mapping function
 * @param {Array} source - the source
 * @param {Array} destination - (Optional) if no one is provided, a new buffer
 * is created
 * @return {Array} the mapped buffer
 * @example
 * const sine = buffer.generate(1024, (x) => Math.sin(x))
 * buffer.map((x) => x * 2, sine) // => a buffer with the gain doubled
 * // partially applied
 * const doubleGain = buffer.map((x) => x * 2)
 * doubleGain(buffer) // => a buffer with the gain doubled
 */
function map (fn, src, dest) {
  if (arguments.length === 1) return (s, d) => map(fn, s, d)
  const len = src.length;
  if (!dest) dest = zeros(len);
  for (let i = 0; i < len; i++) dest[i] = fn(src[i]);
  return dest
}

exports.zeros = zeros;
exports.from = from;
exports.generate = generate;
exports.concat = concat;
exports.combinator = combinator;
exports.copy = copy;
exports.add = add;
exports.mult = mult;
exports.map = map;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * > Discrete Fourier Transformation
 *
 * [![npm install dsp-dft](https://nodei.co/npm/dsp-dft.png?mini=true)](https://npmjs.org/package/dsp-dft/)
 *
 * This module have functions to compute DFT using the correlation algorithm
 * (the simplest and easy to understand, also the slowest)
 *
 * > Various methods are used to obtain DFT for time domain samples including use
 * of Simultaneous Equations using Gaussian elimination, correlation, and using
 * the Fast Fourier Transform algorithm. The first option requires massive work
 * even for a comparitively small number of samples. In actual practice,
 * correlation is the preferred method if the DFT has less than about 32 points.
 *
 * The functions of this module are not intended to be used in production. It
 * has two objectives:
 *
 * - Educational: learn how to implement the DFT correlation algorithm
 * - Testing: test more complex algorithms against this to check results
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * // using dsp-kit
 * var dsp = require('dsp-kit')
 * dsp.dft(signal)
 *
 * @example
 * // requiring only this module
 * var dft = require('dsp-dft')
 * dft.dft(signal)
 *
 * @module dft
 */
const { sin, cos, PI } = Math;

/**
 * Perform the actual DFT correlation
 * @private
 * @param {Object} src - The source source buffers. The imaginary part can be null.
 * @param {Object} dest - The destation bufers. Both `real` and `imag` buffers must
 * be present.
 * @param {Boolean} inverse - Perform inverse DFT
 * @return {Object} the resulted dft as an object `{ real, imag }`
 */
function perform (signal, result, inverse) {
  let real, imag, theta;
  // we take the size of the result. It can be smaller than the source
  const size = result.real.length;
  for (let k = 0; k < size; k++) {
    real = imag = 0.0;
    for (let n = 0; n < size; n++) {
      theta = 2 * PI * k * n / size;
      real += signal.real[n] * cos(theta) - (signal.imag ? signal.imag[n] * sin(theta) : 0);
      imag -= signal.real[n] * sin(theta) + (signal.imag ? signal.imag[n] * cos(theta) : 0);
    }
    result.real[k] = inverse ? real / size : real;
    result.imag[k] = inverse ? imag / size : imag;
  }
}

/**
 * Perform a DFT using a _brute force_ correlation algorithm
 *
 * It accepts real and complex signals of any size.
 *
 * It implements the mathematical function as it, without any kind of optimization,
 * so it's the slowest algorithm possible.
 *
 * This algorithm is not intended to be used in production. It's main use
 * (apart from the educational purposes) is to check the output of more
 * complex algorithms
 *
 * @param {Array|Object} signal - The (real) signal array, or the complex signal
 * object `{ imag, real }`
 * @param {Object} result - (Optional) the pair of buffers `{ imag, real }` to
 * store the result (or new buffers are created if not provided)
 * @return {Object} the DFT result
 */
function dft (signal, result) {
  signal = toComplex(signal);
  result = toComplex(result, signal.real.length);
  perform(signal, result);
  return result
}

/**
 * Perform a __inverse__ DFT using a _brute force_ correlation algorithm
 *
 * It accepts real and complex signals of any size.
 *
 * It implements the mathematical function as it, without any kind of optimization,
 * so it's the slowest algorithm possible.
 *
 * This algorithm is not intended to be used in production. It's main use
 * (apart from the educational purposes) is to check the output of more
 * complex algorithms
 *
 * @param {Object} signal The complex signal as an object with two arrays
 * @param {Array|Object} result - (Optional) the result buffer(s). If is an array
 * or is not provided
 * @return {Object} the
 */
function idft (signal, result) {
  signal = toComplex(signal);
  result = toComplex(result, signal.real.length);
  perform(signal, result, true);
  return result
}

/**
 * Given a signal, create a complex signal.
 * @private
 */
function toComplex (signal, size) {
  if (!signal) {
    if (!size) throw Error('A signal is required')
    return { real: new Array(size), imag: new Array(size) }
  } else if (signal.length) {
    return { real: signal }
  } else if (!signal.real || !signal.imag || signal.real.length !== signal.imag.length) {
    throw Error('Not valid signal: ' + signal + ' (must be an object { real: Array, imag: Array })')
  } else {
    return signal
  }
}

exports.dft = dft;
exports.idft = idft;

},{}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var dspBuffer = require('dsp-buffer');
var dspDft = require('dsp-dft');
var dspFft = require('dsp-fft');
var win = _interopDefault(require('dsp-window'));

/**
 * > Digital Signal Processing
 *
 * [![npm install dsp-kit](https://nodei.co/npm/dsp-kit.png?mini=true)](https://npmjs.org/package/dsp-kit/)
 *
 * This module is a facade of the rest of the `dsp-kit` modules. Currently
 * it exposes:
 *
 * - `dft`: discrete fourier transform functions
 * - `fft`: fast fourier transform functions
 * - `buffer`: create and manipulate buffers
 *
 * @example
 * const dsp = require('dsp-kit')
 * const signal = dsp.generate(1024, (x) => Math.sin(x))
 * dsp.fft.forward(signal)
 *
 * @example
 * // apply a window to a new buffer
 * const signal = dsp.generate(1024, (x) => Math.sin(x))
 * const windowed = dsp.map(signal, dsp.window.hanning())
 * // apply a window to the same buffer
 * dsp.map(signal, dsp.window.hanning(), signal)
 *
 *
 * @module dsp-kit
 */
// window is exported into it's own namespace
var window = win;

exports.window = window;
exports.zeros = dspBuffer.zeros;
exports.generate = dspBuffer.generate;
exports.map = dspBuffer.map;
exports.copy = dspBuffer.copy;
exports.dft = dspDft.dft;
exports.idft = dspDft.idft;
exports.fft = dspFft.fft;
exports.ifft = dspFft.ifft;

},{"dsp-buffer":1,"dsp-dft":2,"dsp-fft":4,"dsp-window":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * > Fast Fourier Transform
 *
 * [![npm install dsp-fft](https://nodei.co/npm/dsp-fft.png?mini=true)](https://npmjs.org/package/dsp-fft/)
 *
 * This module have functions to compute a Fast Fourier transform either
 * in forward and inverse versions. The code is adapted from the unmaintained
 * [dsp.js](https://github.com/corbanbrook/dsp.js) library.
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * const dsp = require('dsp-kit')
 * dsp.spectrum(dsp.fft(signal))
 *
 * @example
 * const fft = require('dsp-fft')
 * const signal = ...
 * // invertible fft
 * fft.ifft(fft.fft(signal)) === signal
 *
 * @module fft
 */

// the tables are cached for better performance
const TABLES = {};

/**
 * Perform a forward Fast Fourier Transform over a real signal (represented
 * as an array of numbers)
 *
 * The length of the input array must be a power of 2.
 *
 * The result is a complex signal, represented with an object with two arrays
 * of same length: `{ real: Array<Number>, imag: Array<Number> }`
 *
 * This code is adapted from the unmaintained library dsp.js
 *
 * @param {Array} signal - The signal to perform the forward fft to. It's length
 * must be a power of 2
 * @param {Object} output - (Optional) the output buffers. If you want to recycle
 * some arrays for performance reason, you can given them here
 * @return {Object} the output buffers
 */
function fft (buffer, output = {}) {
  if (!buffer) throw Error('Buffer is required.')
  const size = buffer.length;
  const tables = getTables(size);
  output.real = asBuffer(size, output.real);
  output.imag = asBuffer(size, output.imag);
  return fftForward(size, tables, buffer, output)
}

/**
 * Perform an inverse Fast Fourier Transform over a complex signal
 *
 * The complex signal is an object with the form `{ real: Array<Number>, imag: Array<Number> }`
 * with the same length. Also the length must be a power of 2
 *
 * It returns a real signal (`Array<Number>`) with the same size.
 *
 * @param {Object} input - The complex signal
 * @param {Array<Number>} output - (Optional) the output buffer (if you want
 * to reuse a buffer for performance issues)
 * @return {Array<Number>} the real signal
 */
function ifft (input, buffer = null) {
  if (!input || !input.real || !input.imag) throw Error('The input must contain real and imag parts: ' + input)
  if (input.real.length !== input.imag.length) throw Error('Real and imaginary parts must have same size')
  const size = input.real.length;
  const tables = getTables(size);
  return fftInverse(size, tables, input, asBuffer(size, buffer))
}

function asBuffer (size, source) {
  if (!source) return new Float64Array(size)
  else if (source.length !== size) throw Error('Buffer size must be ' + size + ' but was ' + source.length)
  return source
}

function getTables (size) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, but was ' + size)
  if (!TABLES[size]) TABLES[size] = generateTables(size);
  return TABLES[size]
}

function isPow2 (num) {
  const k = Math.floor(Math.log(num) / Math.LN2);
  return Math.pow(2, k) === num
}

function generateTables (size) {
  const revTable = new Uint32Array(size);
  const sinTable = new Float64Array(size);
  const cosTable = new Float64Array(size);

  let bit = size >> 1;
  let limit = 1;
  while (limit < size) {
    for (let i = 0; i < limit; i++) {
      revTable[i + limit] = revTable[i] + bit;
    }

    limit = limit << 1;
    bit = bit >> 1;
  }

  for (let i = 0; i < size; i++) {
    sinTable[i] = Math.sin(-Math.PI / i);
    cosTable[i] = Math.cos(-Math.PI / i);
  }
  return { sinTable, cosTable, revTable }
}

/**
 * Performs a forward fast fourier forward transform
 * @private
 */
function fftForward (size, tables, buffer, output) {
  const { cosTable, sinTable, revTable } = tables;
  const { real, imag } = output;

  let halfSize = 1;
  let phaseShiftStepReal,
    phaseShiftStepImag,
    currentPhaseShiftReal,
    currentPhaseShiftImag,
    off,
    tr,
    ti,
    tmpReal;

  for (let i = 0; i < size; i++) {
    real[i] = buffer[revTable[i]];
    imag[i] = 0;
  }

  while (halfSize < size) {
    phaseShiftStepReal = cosTable[halfSize];
    phaseShiftStepImag = sinTable[halfSize];

    currentPhaseShiftReal = 1;
    currentPhaseShiftImag = 0;

    for (let fftStep = 0; fftStep < halfSize; fftStep++) {
      let i = fftStep;

      while (i < size) {
        off = i + halfSize;
        tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
        ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);

        real[off] = real[i] - tr;
        imag[off] = imag[i] - ti;
        real[i] += tr;
        imag[i] += ti;

        i += halfSize << 1;
      }

      tmpReal = currentPhaseShiftReal;
      currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
      currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
    }

    halfSize = halfSize << 1;
  }
  return output
}

/**
 * Performs an inverse fast fourier forward transform
 * @private
 */
function fftInverse (size, tables, input, output) {
  const { cosTable, sinTable, revTable } = tables;
  const real = new Float64Array(size);
  const imag = new Float64Array(size);

  for (let i = 0; i < size; i++) {
    real[i] = input.real[revTable[i]];
    imag[i] = -1 * input.imag[revTable[i]];
  }

  let halfSize = 1;
  let phaseShiftStepReal, phaseShiftStepImag, currentPhaseShiftReal,
    currentPhaseShiftImag, off, tr, ti, tmpReal, i;

  while (halfSize < size) {
    phaseShiftStepReal = cosTable[halfSize];
    phaseShiftStepImag = sinTable[halfSize];
    currentPhaseShiftReal = 1;
    currentPhaseShiftImag = 0;

    for (let fftStep = 0; fftStep < halfSize; fftStep++) {
      i = fftStep;

      while (i < size) {
        off = i + halfSize;
        tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off]);
        ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off]);

        real[off] = real[i] - tr;
        imag[off] = imag[i] - ti;
        real[i] += tr;
        imag[i] += ti;

        i += halfSize << 1;
      }

      tmpReal = currentPhaseShiftReal;
      currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag);
      currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal);
    }

    halfSize = halfSize << 1;
  }

  for (i = 0; i < size; i++) {
    output[i] = real[i] / size;
  }
  return output
}

exports.fft = fft;
exports.ifft = ifft;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * > Windowing functions for digital signal processing
 *
 * [![npm install dsp-window](https://nodei.co/npm/dsp-window.png?mini=true)](https://npmjs.org/package/dsp-window/)
 *
 *
 * All window functions have some extra properties:
 *
 * - rov: recommended overlap
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * const dsp = require('dsp-kit')
 * dsp.generate(1024, dsp.window.hanning())
 *
 * @module window
 */
const { PI, sin, cos } = Math;
const PI2 = PI * 2;

/**
 * The rectangular window, also sometimes called ‘uniform window’, is given by
 * w = 1, equivalent to using no window at all.
 * Although there are some special applications where the rectangular
 * window is advantageous, it is probably not useful for any of our applications
 *
 * - recommended overlap: 50%
 */
const rectangular = () => (n, N) => { return 1 };
rectangular.rov = 0.5;
const none = rectangular;

/**
 * The Hanning window (one of a family of ‘raised cosine’ windows) is also known
 * as ‘Hann window’. Do not confuse it with the ‘Hamming’ window.
 */
const hanning = () => (n, N) => {
  const z = (PI2 * n) / (N - 1);
  return 0.5 * (1 - cos(z))
};

/*
 * The Hamming window is the simplest example of a family of windows that are
 * constructed as a weighted sum of a constant term and some cosine terms. Do
 * not confuse it with the ‘Hanning’ window.
*/
const hamming = () => (n, N) => {
  const z = (PI2 * n) / (N - 1);
  return 0.54 - 0.46 * cos(z)
};

const blackman = (a) => (n, N) => {
  const z = (PI2 * n) / (N - 1);
  return (1 - a) / 2 - 0.5 * cos(z) + a * cos(2 * z) / 2
};

/**
 * The Blackman-Harris window is one of a family of window functions given by a
 * sum of cosine terms. By varying the number and coefficients of the terms
 * different characteristics can be optimized.
*/
const blackmanHarris = () => (n, N) => {
  var z = (PI2 * n) / (N - 1);
  return 0.35875 - 0.48829 * cos(z) + 0.14128 * cos(2 * z) - 0.01168 * cos(3 * z)
};

exports.rectangular = rectangular;
exports.none = none;
exports.hanning = hanning;
exports.hamming = hamming;
exports.blackman = blackman;
exports.blackmanHarris = blackmanHarris;

},{}]},{},[3]);

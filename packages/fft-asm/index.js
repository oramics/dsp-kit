'use strict'
/* eslint-disable space-infix-ops */
/* eslint-disable semi */

// Checks if a number is a power of two
// https://github.com/mikolalysenko/bit-twiddle/blob/master/twiddle.js#L41
function isPow2 (v) { return !(v & (v - 1)) && (!!v) }

function fft (size) {
  if (!isPow2(size)) throw Error('Invalid size: ' + size + ' (must be a power of 2)')

  // init asm.js module
  var heap = new ArrayBuffer(0x10000)
  var asm = FFTModule({
    Float32Array: Float32Array,
    Uint32Array: Uint32Array,
    Math: Math
  }, null, heap)
  asm.init(size)

  return function (dir, input, output) {
    var inverse = dir === 'inverse' ? 1 : 0
    asm.process(inverse)
  }
}

function FFTModule (stdlib, foreign, heap) {
  'use asm'
  var data = new stdlib.Float32Array(heap)
  var inverse = new stdlib.Uint32Array(heap)
  var sin = stdlib.Math.sin
  var PI = stdlib.Math.PI
  var size = 0;

  function init (sz) {
    sz = sz|0;
    var i = 0;
    var bit = 0;
    var limit = 1;
    bit = sz >> 1
    // var limit = 1;
    // var bit = 0;
    //
    // // build the reverse table
    // bit = size >> 1
    // while (limit < size) {
    //   for (i = 0; i < limit; i++) {
    //     inverse[i + limit] = inverse[i] + bit
    //   }
    //   limit = limit << 1
    //   bit = bit >> 1
    // }
    // limit = 2 * size
    // for (var x = size; (x|0) < (limit|0); x = (x + 1)|0) {
    //   data[x] = sin(-PI / i)
    // }
    return 0|0
  }

  function process (inverse) {
    inverse = inverse | 0
  }

  return { init: init, process: process }
}

module.exports = { fft: fft }

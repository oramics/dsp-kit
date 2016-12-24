/**
 * > Array buffer manipulation functions
 *
 * [![npm install dsp-buffer](https://nodei.co/npm/dsp-buffer.png?mini=true)](https://npmjs.org/package/dsp-buffer/)
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * var buffer = require('dsp-buffer')
 * const sine = buffer.generate(1024, (x) => Math.sin(0.5 * x))
 *
 * @example
 * var dsp = require('dsp-kit')
 * dsp.buffer.generate(...)
 *
 * @module buffer
 */

/**
 * Create a buffer (a Float64Array) filled with zeros
 *
 * @param {Integer} size
 * @return {Array} the buffer
 */
function zeros (size) {
  return new Float64Array(size)
}

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
  if (typeof buffer === 'number') buffer = zeros(buffer)
  const size = buffer.length
  for (let i = 0; i < size; i++) buffer[i] = fn(i / size, i, size)
  return buffer
}

/**
 * Map a source with a function
 */
function map (fn, src, dest) {
  if (arguments.length === 1) return (s, d) => map(fn, s, d)
  const len = src.length
  if (!dest) dest = new Float64Array(len)
  for (let i = 0; i < len; i++) dest[i] = fn(src[i])
  return dest
}

/**
 * Copy a buffer into a destination
 */
function copy (src, dest) {
  if (!dest) return Float64Array.from(src)
  const len = src.length
  dest = new Float64Array(len)
  for (let i = 0; i < len; i++) dest[i] = src[i]
  return dest
}

const epsilon = map((x) => x < 2 * Number.EPSILON ? 0 : x)
const round = (n) => {
  n = Math.pow(10, n)
  return map((x) => {
    const r = Math.round(x * n) / n
    return Object.is(r, -0) ? 0 : r
  })
}

module.exports = { zeros, generate, copy, map, epsilon, round }

/**
 * > Array manipulation functions
 *
 * This module contains helper functions to work with arrays (usually typed arrays,
 * but not required).
 *
 * This module accepts the premise that explicit is better than implicit.
 * For this reason:
 * - The first parameter of all the functions is the number of samples to process.
 * - The last parameter of all modifyng functions is the array to use as output
 * allowing _explicit_ in-place modification
 *
 * [![npm install dsp-array](https://nodei.co/npm/dsp-array.png?mini=true)](https://npmjs.org/package/dsp-array/)
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * var array = require('dsp-array')
 * const sine = array.gen(1024, (x) => Math.sin(0.5 * x))
 *
 * @example
 * // included in dsp-kit package
 * var dsp = require('dsp-kit')
 * dsp.gen(...)
 *
 * @module array
 */

/**
 * Create a typed array (a Float64Array) filled with zeros
 *
 * @param {Integer} size
 * @return {Array} the array
 */
export function zeros (size) { return new Float64Array(size) }

/**
 * Generate an array using a function
 *
 * @param {Number|Array} array - The array (to reuse) or an array length to create one
 * @param {Function} fn - the generator function. It receives the following parameters:
 *
 * - n: a number from [0..1]
 * - index: a number from [0...length]
 * - length: the array length
 * @example
 * const sine = array.gen(10, (x) => Math.sin(x))
 */
export function gen (N, fn, output) {
  if (arguments.length < 3) output = zeros(N)
  for (let n = 0; n < N; n++) output[n] = fn(n, N)
  return output
}

/**
 * Concatenate two arrays
 * @param {Array} arrayA
 * @param {Array} arrayB
 * @param {Array} destination - (Optional) If provided, the length must be
 * _at least_ the sum of the arrayA and arrayB length plus the destOffset
 * @return {Array} destination
 * @example
 * // concat into a new array
 * const arrayC = array.concat(arrayA, arrayB)
 */
export function concat (a, b, dest = null, offset = 0) {
  const al = a.length
  const bl = b.length
  if (dest === null) dest = zeros(al + bl + offset)
  for (let i = 0; i < al; i++) dest[i + offset] = a[i]
  for (let i = 0; i < bl; i++) dest[i + al + offset] = b[i]
  return dest
}

/**
 * Add elements from two arrays. Can work in-place
 *
 * @param {Integer} numberOfSamples - the number of samples to add
 * @param {Array} a - one buffer to add
 * @param {Array} b - the other buffer
 * @param {Array} output - (Optional) the output buffer (or a new one if not provided)
 * @return {Array} the output buffer
 * @example
 * add(10, signalA, signalB)
 * // in-place (store the result in signalA)
 * add(10, signalA, signalB, signalA)
 */
export function add (N, a, b, out) {
  out = out || zeros(N)
  for (var i = 0; i < N; i++) out[i] = a[i] + b[i]
  return out
}

/**
 * Multiply elements from two arrays. Can work in-place
 *
 * @param {Integer} numberOfSamples - the number of samples to add
 * @param {Array} a - one buffer to add
 * @param {Array} b - the other buffer
 * @param {Array} output - (Optional) the output buffer (or a new one if not provided)
 * @return {Array} the output buffer
 * @example
 * mult(10, signalA, signalB)
 * // in-place (store the result in signalA)
 * mult(10, signalA, signalB, signalA)
 */
export function mult (N, a, b, out) {
  out = out || zeros(N)
  for (var i = 0; i < N; i++) out[i] = a[i] * b[i]
  return out
}

/**
 * Substract elements from two arrays. Can work in-place
 *
 * @param {Integer} numberOfSamples - the number of samples to add
 * @param {Array} minuend - the buffer to substract from
 * @param {Array} subtrahend - the buffer to get the numbers to being subtracted
 * @param {Array} output - (Optional) the output buffer (or a new one if not provided)
 * @return {Array} the output buffer
 * @example
 * var signalA = [3, 3, 3, 3]
 * var signalB = [0, 1, 2, 3]
 * substr(10, signalA, signalB) // => [3, 2, 1, 0]
 * // in-place (store the result in signalA)
 * substr(10, signalA, signalB, signalA) // => signalA contains the result
 */
export function substr (N, a, b, out) {
  out = out || zeros(N)
  for (var i = 0; i < N; i++) out[i] = a[i] - b[i]
  return out
}

const isSame = Object.is
/**
 * Round the values of an array to a number of decimals.
 *
 * There are small differences of precission between algorithms. This helper
 * function allows to compare them discarding the precission errors.
 *
 * @param {Array} array
 * @param {Integer} decimals - (Optional) the number of decimals (8 by default)
 */
export function round (arr, n = 8, output) {
  const size = arr.length
  if (!output) output = new Float64Array(size)
  const limit = Math.min(size, output.length)
  const m = Math.pow(10, n)
  for (let i = 0; i < limit; i++) {
    const r = Math.round(arr[i] * m) / m
    output[i] = isSame(r, -0) ? 0 : r
  }
  return output
}

/**
 * Test if the N first elements of an array is true for a given predicate
 *
 * @param {Integer} N - the number of elements to test
 * @param {Function} predicate - a function that receive an element of the
 * array and should return true or false
 * @param {Array} array - the array
 * @return {Boolean}
 *
 * @example
 * var signal = [1, 1, 1, 2, 2, 2]
 * testAll(3, signal, (x) => x === 1) // => true
 * testAll(4, signal, (x) => x === 1) // => false
 */
export function testAll (N, fn, array) {
  for (var i = 0; i < N; i++) {
    if (!fn(array[i])) return false
  }
  return true
}

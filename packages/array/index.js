/**
 * > Array manipulation functions
 *
 * [![npm install dsp-array](https://nodei.co/npm/dsp-array.png?mini=true)](https://npmjs.org/package/dsp-array/)
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * var array = require('dsp-array')
 * const sine = array.generate(1024, (x) => Math.sin(0.5 * x))
 *
 * @example
 * // included in dsp-kit package
 * var dsp = require('dsp-kit')
 * dsp.generate(...)
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
 * const sine = array.generate(10, (x) => Math.sin(x))
 */
export function generate (array, fn) {
  if (typeof array === 'number') array = zeros(array)
  const N = array.length
  for (let n = 0; n < N; n++) array[n] = fn(n, N)
  return array
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
 * Apply a window to a signal.
 *
 * @param {Array} window - the window to apply
 * @param {Array} signal - the signal
 * @param {Integer} offset - (Optional) the offset in the signal to place
 * the window (0 by default)
 * @param {Array} output - (Optional) the output array (must be at least the
 * same size as the window)
 * @return {Array} the signal fragment after the window applied
 *
 * @example
 * var signal = array.generate(1024, ...)
 * var hamming = array.generate(100, (n, N) => 0.54 - 0.46 * Math.cos(2 * Math.PI * n / (N - 1)))
 * var windowed = array.window(hamming, signal)
 * windowed.length // => 100
 */
export function window (win, signal, offset, output) {
  const size = win.length
  if (!output) output = zeros(size)
  offset = offset || 0
  for (let i = 0; i < size; i++) {
    output[i] = signal[i + offset] * win[i]
  }
  return output
}

/**
 * Create an array combinator. Given a function, returns a function to combine
 * two arrays using that function.
 *
 * @param {Function} fn - the function used to combine the arrays. It accepts
 * two parameters: the numbers of each array to combine
 * @return {Function} the combinator function
 * @see copyTo, add, mult
 */
export function combinator (fn) {
  return function (arrayA, arrayB, dest = null, offsetA = 0, offsetB = 0, offsetD = 0) {
    const sizeA = arrayA.length - offsetA
    const sizeB = arrayB.length - offsetB
    const arrayD = typeof dest === 'number' ? zeros(dest)
      : dest === null ? zeros(Math.min(sizeA, sizeB) + offsetD)
      : dest
    const sizeD = arrayD.length - offsetD
    const max = Math.min(sizeA, sizeB, sizeD)
    for (let i = 0; i < max; i++) {
      arrayD[i + offsetD] = fn(arrayA[i + offsetA], arrayB[i + offsetB])
    }
    return arrayD
  }
}

const copyTo = combinator((a, b) => a)
/**
 * Copy an array
 * @param {Array} source
 * @param {Array} destination - (Optional)
 * @return {Array} destination
 */
export function copy (src, dest, srcOffset, destOffset) {
  return copyTo(src, src, dest, srcOffset, srcOffset, destOffset)
}

/**
 * Add two arrays.
 *
 * @param {Array} arrayA - the source array
 * @param {Array} arrayB - the B array
 * @param {Array|Integer} destination - (Optional) the destination array or the
 * number of samples to add. If not present, a new array is created.
 * @param {Integer} offsetA - (Optional) the start offset of the A array
 * @param {Integer} offsetA - (Optional) the start offset of the B array
 * @param {Integer} offsetDestination - (Optional) the start offset of the destination array
 * @return {Array} the destination array (the provided or a new one if no one provided)
 *
 * @example
 * // add to arrays into a new one
 * const result = array.add(arrayA, arrayB)
 * // add to arrays into a third
 * array.add(arrayA, arrayB, dest)
 */
export const add = combinator((a, b) => a + b)

export const substr = combinator((a, b) => a - b)

/**
 * Multiply two arrays.
 *
 * @param {Array} arrayA - the source array
 * @param {Array} arrayB - the B array
 * @param {Array|Integer} destination - (Optional) the destination array or the
 * number of samples to add. If not present, a new array is created.
 * @param {Integer} offsetA - the start offset of the A array
 * @param {Integer} offsetA - the start offset of the B array
 * @param {Integer} offsetDestination - the start offset of the destination array
 *
 * @example
 * // add to arrays into a new one
 * const result = array.add(arrayA, arrayB)
 *
 * @example
 * // add to arrays into a third
 * array.add(arrayA, arrayB, dest)
 */
export const mult = combinator((a, b) => a * b)

/**
 * Map an array with a function
 *
 * This function can be partially applied (see examples)
 *
 * @param {Function} fn - the mapping function
 * @param {Array} source - the source
 * @param {Array} destination - (Optional) if no one is provided, a new array
 * is created
 * @return {Array} the mapped array
 * @example
 * const sine = array.generate(1024, (x) => Math.sin(x))
 * array.map((x) => x * 2, sine) // => an array with the gain doubled
 * // partially applied
 * const doubleGain = array.map((x) => x * 2)
 * doubleGain(array) // => an array with the gain doubled
 */
export function map (fn, src, dest) {
  if (arguments.length === 1) return (s, d) => map(fn, s, d)
  const len = src.length
  if (!dest) dest = zeros(len)
  for (let i = 0; i < len; i++) dest[i] = fn(src[i])
  return dest
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

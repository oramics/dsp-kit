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
export function zeros (size) { return new Float64Array(size) }

/**
 * Create a buffer from an array (an alias for Float64Array.from)
 */
export const from = Float64Array.from.bind(Float64Array)

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
export function generate (buffer, fn) {
  if (typeof buffer === 'number') buffer = zeros(buffer)
  const N = buffer.length
  for (let n = 0; n < N; n++) buffer[n] = fn(n, N)
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
export function concat (a, b, dest = null, offset = 0) {
  const al = a.length
  const bl = b.length
  if (dest === null) dest = zeros(al + bl + offset)
  for (let i = 0; i < al; i++) dest[i + offset] = a[i]
  for (let i = 0; i < bl; i++) dest[i + al + offset] = b[i]
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
export function combinator (fn) {
  return function (bufferA, bufferB, dest = null, offsetA = 0, offsetB = 0, offsetD = 0) {
    const sizeA = bufferA.length - offsetA
    const sizeB = bufferB.length - offsetB
    const bufferD = typeof dest === 'number' ? zeros(dest)
      : dest === null ? zeros(Math.min(sizeA, sizeB) + offsetD)
      : dest
    const sizeD = bufferD.length - offsetD
    const max = Math.min(sizeA, sizeB, sizeD)
    for (let i = 0; i < max; i++) {
      bufferD[i + offsetD] = fn(bufferA[i + offsetA], bufferB[i + offsetB])
    }
    return bufferD
  }
}

const copyTo = combinator((a, b) => a)
/**
 * Copy a buffer
 * @param {Array} source
 * @param {Array} destination - (Optional)
 * @return {Array} destination
 */
export function copy (src, dest, srcOffset, destOffset) {
  return copyTo(src, src, dest, srcOffset, srcOffset, destOffset)
}

/**
 * Add two buffers.
 *
 * @param {Array} bufferA - the source buffer
 * @param {Array} bufferB - the B buffer
 * @param {Array|Integer} destination - (Optional) the destination buffer or the
 * number of samples to add. If not present, a new buffer is created.
 * @param {Integer} offsetA - (Optional) the start offset of the A buffer
 * @param {Integer} offsetA - (Optional) the start offset of the B buffer
 * @param {Integer} offsetDestination - (Optional) the start offset of the destination buffer
 * @return {Array} the destination buffer (the provided or a new one if no one provided)
 *
 * @example
 * // add to buffers into a new one
 * const result = buffer.add(bufferA, bufferB)
 * // add to buffers into a third
 * buffer.add(bufferA, bufferB, dest)
 */
export const add = combinator((a, b) => a + b)

export const substr = combinator((a, b) => a - b)

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
export const mult = combinator((a, b) => a * b)

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

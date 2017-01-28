import { val } from './core'

/**
 * > Mathematical functions and constants
 *
 * Note that a lot of the math functions have a precision that's implementation-dependent.
 *
 * @see Math
 * @module signal/arithmetic
 */

/**
 * Get absolute value of a signal
 * @name abs
 * @function
 * @memberof module:signal/arithmetic
 */
export const abs = (a) => () => Math.abs(val(a))

/**
 * Add signals
 * @name add
 * @function
 * @memberof module:signal/arithmetic
 */
export const add = (a, b) => () => val(a) + val(b)

/**
 * Subtract signals
 * @name sub
 * @function
 * @memberof module:signal/arithmetic
 */
export const sub = (a, b) => () => val(a) - val(b)

/**
 * Subtract signals
 * @name div
 * @function
 * @memberof module:signal/arithmetic
 */
export const div = (a, b) => val(a) / val(b)

/**
 * Subtract signals
 * @name mod
 * @function
 * @memberof module:signal/arithmetic
 */
export const mod = (a, b) => val(a) % val(b)

/**
 * Subtract signals
 * @name mul
 * @function
 * @memberof module:signal/arithmetic
 */
export const mul = (a, b) => val(a) * val(b)
/**
 * Subtract signals
 * @name pow
 * @function
 * @memberof module:signal/arithmetic
 */
export const pow = (a, b) => Math.pow(val(a), val(b))

/**
 * Returns the arcosine (in radians) of a number
 * @param {Signal|Number} number
 * @return {Signal}
 */
export const acos = (number) => () => Math.acos(val(number))

/**
 * Returns the arcsine (in radians) of a number
 * @param {Signal|Number} number
 * @return {Signal}
 */
export const asin = (number) => () => Math.asin(val(number))

/**
 * Returns the arctangent (in radians) of a number
 * @param {Signal|Number} number
 * @return {Signal}
 */
export const atan = (number) => () => Math.atan(val(number))

/**
 * Returns the cosine of the input (interpreted as radians)
 * @param {Signal|Number} radians
 * @return {Signal}
 */
export const cos = (radians) => () => Math.cos(val(radians))

/**
 * Returns the sine of the input (interpreted as radians)
 * @param {Signal|Number} radians
 * @return {Signal}
 */
export const sin = (radians) => () => Math.sin(val(radians))

/**
 * Returns the tangent of the input (interpreted as radians)
 * @param {Signal|Number} radians
 * @return {Signal}
 */
export const tan = (radians) => () => Math.tan(val(radians))

/**
 * Returns the smallest integer greater than or equal to a given number
 *
 * @param {Signal|Number} number
 * @return {Signal}
 * @see Math.ceil
 */
export const ceil = (num) => () => Math.ceil(val(num))

/**
 * Returns the largest integer less than or equal to a given number
 *
 * @param {Signal|Number} number
 * @return {Signal}
 * @see Math.floor
 */
export const floor = (num) => () => Math.floor(val(num))

/**
 * Rounds the signal to a number of decimals
 */
export function round (signal, dec = 0) {
  var f = Math.pow(10, dec)
  return () => Math.round(val(signal) * f) / f
}

import { val } from './core'
/**
 * > Arithmetic operation on signals
 *
 * @module signal/arithmetic
 */

const _abs = Math.abs
const _pow = Math.pow

/**
 * Get absolute value of a signal
 * @name abs
 * @function
 * @memberof module:signal/arithmetic
 */
export const abs = (a) => () => _abs(val(a))

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
export const pow = (a, b) => _pow(val(a), val(b))

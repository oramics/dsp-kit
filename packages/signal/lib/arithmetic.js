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
export const abs = (a) => () => _abs(a())

/**
 * Add signals
 * @name add
 * @function
 * @memberof module:signal/arithmetic
 */
export const add = (a, b) => () => a() + b()

/**
 * Subtract signals
 * @name sub
 * @function
 * @memberof module:signal/arithmetic
 */
export const sub = (a, b) => () => a() - b()

/**
 * Subtract signals
 * @name div
 * @function
 * @memberof module:signal/arithmetic
 */
export const div = (a, b) => a() / b()

/**
 * Subtract signals
 * @name mod
 * @function
 * @memberof module:signal/arithmetic
 */
export const mod = (a, b) => a() % b()

/**
 * Subtract signals
 * @name mul
 * @function
 * @memberof module:signal/arithmetic
 */
export const mul = (a, b) => a() * b()
/**
 * Subtract signals
 * @name pow
 * @function
 * @memberof module:signal/arithmetic
 */
export const pow = (a, b) => _pow(a(), b())

import { val } from './core'

/**
 * > Comparasion operation on signals
 *
 * @module signal/comparasion
 */

/**
 * Returns 1 if two inputs are __equal__, otherwise returns 0.
 * @name eq
 * @function
 * @memberof module:signal/comparation
 */
export const eq = (a, b) => () => val(a) === val(b) ? 1 : 0

/**
 * Returns 1 if a is __greater__ than b, otherwise returns 0.
 * @name gt
 * @function
 * @memberof module:signal/comparation
 */
export const gt = (a, b) => () => val(a) > val(b) ? 1 : 0

/**
 * Returns 1 if a is __greater or equal__ than b, otherwise returns 0.
 * @name gte
 * @function
 * @memberof module:signal/comparation
 */
export const gte = (a, b) => () => val(a) >= val(b) ? 1 : 0

/**
 * Returns `a` if `a` is __greater__ than `b`, otherwise returns 0.
 * @name gtp
 * @function
 * @memberof module:signal/comparation
 */
export const gtp = (a, b) => () => {
  const a = val(a)
  return a > val(b) ? a : 0
}

/**
 * Returns 1 if a is __less__ than b, otherwise returns 0.
 * @name lt
 * @function
 * @memberof module:signal/comparation
 */
export const lt = (a, b) => () => val(a) < val(b) ? 1 : 0

/**
 * Returns 1 if a is __less or equal__ than b, otherwise returns 0.
 * @name lte
 * @function
 * @memberof module:signal/comparation
 */
export const lte = (a, b) => () => val(a) <= val(b) ? 1 : 0

/**
 * Returns `a` if `a` is __less__ than `b`, otherwise returns 0.
 * @name ltp
 * @function
 * @memberof module:signal/comparation
 */
export const ltp = (a, b) => () => {
  const a = val(a)
  return a < val(b) ? a : 0
}

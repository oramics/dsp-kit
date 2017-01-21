/**
 * @module signal/integrator
 */

/**
 * Increment a stored value between a provided range
 * @name accum
 * @function
 * @memberof module:signal/integrator
 */
export const accum = (step, { min = -1, max = 1, init = 0 } = {}) => () => {
  const val = init
  init += step
  if (init > max) init = min
  if (init < min) init = max
  return val
}

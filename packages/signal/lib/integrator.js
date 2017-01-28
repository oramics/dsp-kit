import { val } from './core'

/**
 * @module signal/integrator
 */

/**
 * Increment a stored value between a provided range
 * @name accum
 * @function
 * @memberof module:signal/integrator
 */
export function accum (step = 0.1, reset = 0, { min = 0, max = 1, init = 0 } = {}) {
  var next = init
  return function () {
    const current = val(reset) === 1 ? init : next
    next += val(step)
    if (next > max) next = min
    else if (next < min) next = max
    return current
  }
}

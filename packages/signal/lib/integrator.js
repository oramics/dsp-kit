import { val } from './core'
import { mul } from './math'

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

/**
 * A phasor accumulates phase, as determined by its frequency, and wraps between
 * 0 and 1. This creates a sawtooth wave, but with a dc offset of 1 (no negative
 * numbers)
 */
export function phasor (frequency, reset, props = {}, sampleRate = 44100) {
  let range = (props.max || 1) - (props.min || 0)
  return accum(mul(frequency, range / sampleRate), reset, props)
}

/**
 * Clamp constricts an signal to a particular range. If signal exceeds the
 * maximum, the maximum is returned. If signal is less than the minimum, the
 * minimum is returned.
 *
 * @name clamp
 * @function
 * @param {(Signal|Number)} signal
 * @param {(Signal|Number)} [min = -1]
 * @param {(Signal|Number)} [max = 1]
 */
export function clamp (signal, min = -1, max = 1) {
  return function () {
    var s = val(signal)
    var M = val(max)
    var m = val(min)
    return s > M ? M : s < m ? m : s
  }
}

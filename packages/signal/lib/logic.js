/**
 * > Logic functions for signal processing
 * @module signal/logic
 */
import { val } from './core'

/**
 * Returns 1 if both signals are not 0
 *
 * @function
 * @param {(Signal|Number)} a - input signal
 * @param {(Signal|Number)} b - input signal
 * @return {Signal}
 */
export const and = (a, b) => () => val(a) !== 0 && val(b) !== 0 ? 1 : 0

/**
 * Returns 0 if both signals are 0, 1 otherwise
 *
 * @function
 * @param {(Signal|Number)} a - input signal
 * @param {(Signal|Number)} b - input signal
 * @return {Signal}
 */
export const or = (a, b) => () => val(a) !== 0 || val(b) !== 0 ? 1 : 0

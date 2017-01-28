
/**
 * Get value of a signal
 * @param {Function|Number} signal
 * @return {Number}
 */
export function val (s) {
  return typeof s === 'function' ? s() : parseFloat(s)
}

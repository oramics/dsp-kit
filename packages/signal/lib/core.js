
/**
 * Get value of a signal
 * @param {Function|Number} signal
 * @return {Number}
 * @private
 */
export function val (s) {
  return typeof s === 'function' ? s() : parseFloat(s)
}

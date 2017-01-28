/**
 * > Generate signals
 *
 * This is a collection of functions to generate signals using one sample a time.
 * This is a quite slow implementation and not ready for realtime generation.
 * The main focus is on easy to read, aka learn-dsp.
 *
 * This implementation is largely based on the excellent [genish.sh](https://github.com/charlieroberts/genish.js)
 * library that has much more performance than this one.
 *
 * @module signal
 */

export {
  abs, add, div, mod, mul, pow, sub,
  sin, cos, tan, asin, acos, atan,
  floor, ceil, round
 } from './lib/math'
export { and, or } from './lib/logic'
export { eq, lt, lte, ltp, gt, gte, gtp } from './lib/comparasion'
export { accum, clamp } from './lib/integrator'
export { bang, ifelse } from './lib/control'
export { loop } from './lib/buffer'

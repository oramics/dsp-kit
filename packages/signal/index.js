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

export { abs, add, div, mod, mul, pow, sub } from './lib/arithmetic'
export { eq, lt, lte, ltp, gt, gte, gtp } from './lib/comparasion'
export { accum } from './lib/integrator'
export { bang } from './lib/control'

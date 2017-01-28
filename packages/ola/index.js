/**
 * > Add and overlap timestretch algorithm
 *
 * The overlap and add is the simplest, cheaper (in terms of computation) and
 * less quality timestretch algorithm. It changes the length of a buffer without
 * changing it's pitch.
 *
 * [![npm install dsp-ola](https://nodei.co/npm/dsp-ola.png?mini=true)](https://npmjs.org/package/dsp-ola/)
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @example
 * var ola = require('dsp-ola')
 * const stretch = ola.overlapAdd({ size: 1024 })
 * const halfSize = stretch(0.5, audioBuffer)
 *
 * @example
 * var dsp = require('dsp-kit')
 *
 * @module ola
 */
const cos = Math.cos
const PI2 = 2 * Math.PI

const hamming = () => (n, N) => 0.54 - 0.46 * cos(PI2 * n / (N - 1))

/**
 * Create a timestretch function using an overlap and add algorithm
 *
 * @param {Object} options
 * @return {Function} the timestretch function
 * @example
 * const stretch = ola.overlapAdd()
 * stretch(0.5, audio) // => a new audio buffer half of the length
 */
export function overlapAdd ({ size = 1024, hop = size / 2, windowFn = hamming() } = {}) {
}

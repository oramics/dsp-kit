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
import { zeros, generate, copy, mult } from 'dsp-buffer'
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
export function overlapAdd (options = {}) {
  const { size = 1024, hopFactor = 0.5 } = options
  const window = generate(size, options.window || hamming())
  const frame = zeros(size)
  // we will always overlap hopFactor in the destination
  const destHopSize = Math.floor(size * hopFactor)

  return function (factor, src, dest) {
    var frames
    const srcHopSize = Math.floor(destHopSize / factor)
    const srcLen = src.length
    if (dest) {
      frames = Math.floor(dest.length / destHopSize)
    } else {
      frames = Math.floor(srcLen / srcHopSize)
      console.log('NO DEST', frames, destHopSize, srcHopSize, srcLen)
      dest = zeros(frames * destHopSize)
    }
    for (var i = 0; i < frames; i += 1) {
      mult(src, window, frame, i * srcHopSize)
      copy(frame, dest, 0, i * destHopSize)
    }
    return dest
  }
}

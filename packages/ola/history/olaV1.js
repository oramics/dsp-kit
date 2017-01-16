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
import { zeros, gen, add, mult } from 'dsp-array'
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
  const { size = 1024, hop = size / 2 } = options
  const window = gen(size, options.window || hamming())
  const frame = zeros(size)

  return function (factor, src, dest) {
    var frames
    // we change hop size in source to change the size of the dest
    const srcHopSize = Math.floor(hop / factor)
    const srcLen = src.length
    if (!dest) {
      // if not dest, create one
      frames = Math.floor(srcLen / srcHopSize)
      dest = zeros(frames * hop)
    } else {
      frames = Math.floor(dest.length / hop)
    }

    let read, write
    for (var i = 0; i < frames; i++) {
      read = src.subarray(i * srcHopSize, i * srcHopSize + size)
      write = src.subarray(i * hop, i * hop + size)
      mult(size, read, window, frame)
      add(size, frame, write, write)
    }
    return dest
  }
}

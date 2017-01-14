/**
 * > Wavetable oscillators
 *
 * [![npm install dsp-oscillator](https://nodei.co/npm/dsp-oscillator.png?mini=true)](https://npmjs.org/package/dsp-oscillator/)
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * ### References
 *
 * - http://www.earlevel.com/main/2012/05/09/a-wavetable-oscillator%E2%80%94part-3/
 * - http://www.earlevel.com/main/2012/05/25/a-wavetable-oscillator%E2%80%94the-code/
 * - https://github.com/OpenDAWN/wavetable
 *
 * @example
 * const oscillator = require('dsp-oscillator')
 *
 * @module oscillator
 */
import { zeros } from 'dsp-buffer'
const { round, PI, sin } = Math
const PI2 = 2 * PI

/*
 * oscillator module TODO:
 * - other generators
 * - phase parameter
 */

const generators = {
  sine: (x) => sin(PI2 * x),
  saw: (x) => 2 * (x - Math.round(x))
}

/**
 * Create an oscillator. Returns a function that generates the oscillator
 * signal
 * @param {Object} params - oscillator parameters:
 *
 * - type: one of 'sine'
 * - sampleRate: 44100 by default
 * - defaultSize: the length of the generated buffer
 */
export function oscillator ({ type = 'sine', sampleRate = 44100, defaultSize = 1024 } = {}) {
  let frameCount = 0
  let tableLen = 2048
  let table = generateWaveTable(tableLen, generators[type], sampleRate)

  /**
   * Generate the oscillator data
   */
  return function ({ frequency = 440, size = 0 } = {}, output) {
    if (!output) output = zeros(size || defaultSize)
    size = output.length
    let frameOffset = frameCount * size
    let step = tableLen * frequency / sampleRate
    let offset

    for (let i = 0; i < size; i++) {
      offset = round((frameOffset + i) * step)
      output[i] = table[offset % tableLen]
    }
    frameCount++

    return output
  }
}

function generateWaveTable (size, gen, sampleRate) {
  let table = zeros(size)
  var waveTableTime = size / sampleRate
  var waveTableHz = 1 / waveTableTime

  for (var i = 0; i < size; i++) {
    table[i] = gen(i * waveTableHz / sampleRate)
  }
  return table
}

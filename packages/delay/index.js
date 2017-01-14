/**
 * > Delay a signal
 *
 * [![npm install dsp-delay](https://nodei.co/npm/dsp-delay.png?mini=true)](https://npmjs.org/package/dsp-delay/)
 *
 * The code of this module is adapted from the unmaintained
 * [dsp.js](https://github.com/corbanbrook/dsp.js) by Corban Brook
 * which in turn is adapted from
 * http://code.almeros.com/code-examples/delay-firefox-audio-api by Almer Thie
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)
 *
 * @module delay
 */
const { zeros } = require('dsp-array')

// return a function to the index of a circular buffer
const circular = (l) => (n) => (l + n) % l

export function delay ({
  delay = 1,
  maxDelay = delay * 2,
  delayGain = 1,
  feedback = 0
} = {}) {
  const buffer = zeros(maxDelay)
  const ndx = circular(buffer.length)
  let writeAt = 0

  return function (input, output) {
    const size = input.length
    if (!output) output = zeros(size)

    for (let i = 0; i < size; i++) {
      buffer[writeAt] = input[i]
      output[i] = buffer[ndx(writeAt - delay)] * delayGain
      if (feedback) buffer[writeAt] += output[i] * feedback
      writeAt = ndx(writeAt + 1)
    }
    return output
  }
}

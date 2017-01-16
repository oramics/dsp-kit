import { zeros, add } from 'dsp-array'
import { ifft } from 'dsp-fft'
import { rectangular } from 'dsp-spectrum'
import { ifftshift } from 'dsp-fftshift'

/**
 * Synthesize a signal from a collection of frames
 * @private
 * @param {Array<Object>} frames - an array of frames (`{ magnitudes, phases }`)
 * @param {Object} options - All required: size, hop, sampeRate, factor
 * @param {Array} output - (Optional) the output array
 */
export default function synthesis (frames, { size, hop, sampleRate, factor }, output) {
  if (!frames || !frames.length) throw Error('"frames" parameter is required in synthesis')

  var len = frames.length
  var hopS = hop * factor
  if (!output) output = zeros(len * hopS + size)
  var inverse = ifft(size)
  var position = 0

  // create some intermediate buffers (and reuse it for performance)
  var rectFD = { real: zeros(size), imag: zeros(size) }
  var timeDomain = { real: zeros(size), imag: zeros(size) }
  for (var i = 0; i < len; i++) {
    if (i === 2000) console.log('frame 3000', frames[i])
    // 1. Convert freq-domain from polar to rectangular
    rectangular(frames[i], rectFD)
    // 2. Convert from freq-domain in rectangular to time-domain
    var signal = inverse(rectFD, timeDomain).real
    // 3. Unshift the previous cycling shift
    ifftshift(signal)
    // 4. Overlap add
    add(signal, output, output, 0, position, position)
    position += hopS
  }
  return output
}

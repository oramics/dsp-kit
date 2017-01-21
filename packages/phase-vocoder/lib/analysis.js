import { zeros, fill, mult } from 'dsp-array'
import { fft } from 'dsp-fft'
import { polar } from 'dsp-spectrum'
import { fftshift } from 'dsp-fftshift'

/**
 *
 */
export default function analysis (signal, { size, hop, windowFn } = {}) {
  var forward = fft(size)
  var numFrames = Math.floor((signal.length - size) / hop)
  var window = fill(size, windowFn)

  // create an array to store all frames
  var frames = new Array(numFrames)

  // create some intermediate buffers (frame and frame in freq domain)
  var frame = zeros(size)
  var fdFrame = { real: zeros(size), imag: zeros(size) }
  for (var i = 0; i < numFrames; i++) {
    frame.set(signal.subarray(i * hop, size))
    // 1. place a window into the signal
    mult(size, window, frame, frame)
    // 3. Cyclic shift to phase zero windowing
    fftshift(frame) // => centered
    // 4. Perform the forward fft
    forward(frame, fdFrame)
    // 5. Convert to polar form in a new frame
    frames[i] = polar(fdFrame)
    if (isNaN(frames[i].phases[0])) throw Error('NaN anal ' + i)
  }
  return frames
}

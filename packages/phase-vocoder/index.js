/**
 * > Phase-vocoder timestretch algorithm
 *
 * Time stretching means altering the duration of a signal without changing its pitch
 *
 * [![npm install dsp-phase-vocoder](https://nodei.co/npm/dsp-phase-vocoder.png?mini=true)](https://npmjs.org/package/dsp-phase-vocoder/)
 *
 * A short-time Fourier transform (STFT) is performed on a windowed time-domain
 * real signal to obtain a succession of overlapped spectral frames with minimal
 * side-band effects (analysis stage). The time delay at which every spectral
 * frame is picked up from the signal is called the hop size.
 *
 * The timedomain signal may be rebuilt by performing an inverse FastFourier
 * transform on all frames followed by a successive accumulation of all frames
 * (an operation termed overlap-add)
 *
 * Knowing the modulus of every bin is not enough: the phase information is
 * necessary for a perfect recovery of a signal without modification.
 * Furthermore the phase information allows an evaluation of ’instantaneous
 * frequencies’ by the measure of phases between two frames
 *
 * The essential idea is to build two functions (analyze and
 * synthesize) which are intended to work as a tightly coupled set. Between
 * these two function calls, however, any number of manipulations can be
 * performed to obtain the desired effects
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

 *
 * ### References
 *
 * - https://www.spsc.tugraz.at/sites/default/files/Bachelor%20Thesis%20Gruenwald.pdf
 * - http://www.cs.princeton.edu/courses/archive/spr09/cos325/Bernardini.pdf
 *
 * @example
 * var dsp = require('dsp-kit')
 *
 *
 * @module phase-vocoder
 */
import { fft } from 'dsp-fft'
import { hanning } from 'dsp-window'
import { generate, copy, mult, center } from 'dsp-buffer'
import { spectrum } from 'dsp-spectrum'

/**
 *
 */
export function analysis (signal, params = {}) {
  const { size = 1024, hop = size / 5 } = params
  const forward = fft(size)
  const numFrames = Math.floor((signal.length - size) / hop)
  // create the window buffer
  const window = generate(size, params.window || hanning())
  // create frame buffer (and reuse it for performance)
  const frame = new Float64Array(size)
  // create an array to store all frames
  const frames = new Array(numFrames)
  for (let i = 0; i < numFrames; i++) {
    // 1. copy a slice into the frame
    copy(signal, frame, i * hop)
    // 2. multiply the frame by the window
    mult(window, frame, frame)
    // 3. Cyclic shift to phase zero windowing
    // 4. Perform the fft to the frame
    frames[i] = spectrum(forward(center(frame)))
  }
  return frames
}

/**
 * It recalculates each frame phase based on the stretch factor
 */
function stretch (frames, options) {
  const numFrames = frames.length
  for (let i = 2; i < numFrames; i++) {
    const prev = frames[i - 1]
    const current = frames[i]
  }
}

/**
 * Synthesize a signal from a collection of frames
 */
function synthesis (frames, options) {
}

/*
          var fft = new FFT(points, freq);
          fft.forward(hanning.process(section));
          output_frames.push(fft);
          var this_frame = fft;
          frames_processed++;

          if (frames_processed > 1) {
            var last_frame = output_frames[frames_processed - 2];
            // For each bin
            for (var bin = 0; bin < points; ++bin) { // only work on the lower freqs
              var phase_shift = phase(this_frame, bin) - phase(last_frame, bin);
              var freq_deviation = (phase_shift / (hop / freq)) - fft.getBandFrequency(bin);
              var wrapped_deviation = ((freq_deviation + Math.PI) % (2 * Math.PI)) - Math.PI;
              var true_freq = fft.getBandFrequency(bin) + wrapped_deviation;
              var new_phase = phase(last_frame, bin) + ((hop_synthesis / freq) * true_freq);

              // Calculate new spectrum
              var new_mag = Math.sqrt(
                (this_frame.real[bin] * this_frame.real[bin]) +
                (this_frame.imag[bin] * this_frame.imag[bin]));

              this_frame.real[bin] = new_mag * Math.cos(new_phase);
              this_frame.imag[bin] = new_mag * Math.sin(new_phase);
            }
          }
        } else {
          output_frames.push(hanning.process(section));
          frames_processed++;
        }
*/

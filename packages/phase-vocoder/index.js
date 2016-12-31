/**
 * > Phase-vocoder timestretch algorithm
 *
 * Time stretching means altering the duration of a signal without changing its pitch
 *
 * [![npm install dsp-phase-vocoder](https://nodei.co/npm/dsp-phase-vocoder.png?mini=true)](https://npmjs.org/package/dsp-phase-vocoder/)
 *
 * The essential idea is to build two fnctions (analyze and
 * synthesize) which are intended to work as a tightly coupled set. Between
 * these two function calls, however, any number of manipulations can be
 * performed to obtain the desired effects
 *
 * This is part of [dsp-kit](https://github.com/oramics/dsp-kit)

 *
 * ### References
 *
 * - https://www.spsc.tugraz.at/sites/default/files/Bachelor%20Thesis%20Gruenwald.pdf
 *
 * @example
 * var dsp = require('dsp-kit')
 *
 *
 * @module phase-vocoder
 */

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

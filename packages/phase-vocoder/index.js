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
 * - https://github.com/echo66/time-stretch-wac-article/blob/master/ts-ps-wac.pdf
 * - https://www.spsc.tugraz.at/sites/default/files/Bachelor%20Thesis%20Gruenwald.pdf
 * - http://www.cs.princeton.edu/courses/archive/spr09/cos325/Bernardini.pdf
 *
 * @example
 * var dsp = require('dsp-kit')
 *
 *
 * @module phase-vocoder
 */
import analysis from './lib/analysis'
import synthesis from './lib/synthesis'
import recalcPhases from './lib/recalcPhases'
import randomPhases from './lib/randomPhases'
import { fill } from 'dsp-array'
import { bandFrequency } from 'dsp-spectrum'
import { hanning } from 'dsp-window'
import { fft } from 'dsp-fft'
// var dspjs = require('dspjs')

/**
 * Implements a standard phase vocoder timestretch algorithm. It returns a
 * function that process the data.
 */
export function phaseVocoder ({
  algorithm = 'phase-vocoder',
  size = 512,
  hop = 125,
  sampleRate = 44100,
  windowFn = hanning()
} = {}) {
  // a lookup table of bin center frecuencies
  var omega = fill(size, (x) => bandFrequency(x, size, sampleRate))
  var ft = fft(size)
  console.log('PHASE VOCODER', algorithm, size, hop)

  return function stretch (factor, signal, output, timeFreqProccessing) {
    console.log('STRETCH', algorithm, signal.slice(0, 100))
    var frames = analysis(signal, { ft, size, hop, windowFn })
    if (timeFreqProccessing) timeFreqProccessing(frames, { size, hop, sampleRate })
    if (algorithm === 'phase-vocoder') recalcPhases(frames, { size, factor, hop }, omega)
    else if (algorithm === 'paul-stretch') randomPhases(frames, size)
    else console.log('Algorithm', algorithm)
    return synthesis(frames, { ft, size, hop, factor, sampleRate })
  }
}

/**
 * Implements the paul stretch algorithm for extreme timestretching
 */
export function paulStretch ({ size = 512, hop = 125, sampleRate = 44100 } = {}) {
  return function stretch (factor, signal) {
    var frames = analysis(signal, { size, hop })
    randomPhases(frames, size)
    return synthesis(frames, { size, hop, factor, sampleRate })
  }
}

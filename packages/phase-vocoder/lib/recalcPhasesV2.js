const round = Math.round
const PI2 = 2 * Math.PI

/**
 * If the phase vocoder is utilized to perform effects that involve the
 * inequality of input hop size and synthesis hop
 * size, it is advisable to perform some phase adjustments
 *
 * It uses tha algorithm described in https://github.com/echo66/time-stretch-wac-article/blob/master/ts-ps-wac.pdf
 *
 * @private
 * @param {Array<Object>} frames - and array of frames. Each frame is
 * a `{ magnitudes, phases }` object
 * @param {Object} parameters
 * @param {Array} omega - a pre-calculated center frequency of each bin
 */
export default function recalcPhases (frames, { size, factor, hop }, omega) {
  var ha = hop // hop analysis
  var hs = hop * factor // hop synthesis
  var numFrames = frames.length

  var prev = frames[0].phases
  for (var f = 1; f < numFrames; f += 1) {
    var current = frames[f].phases

    for (var i = 0; i < size; i += 1) {
      // Calculate the difference between current and previous phase spectra
      // and, then, the sample-wise difference with the frequency centres
      var centerFreq = omega[i]
      // var expectedPhaseAdv = ha * centerFreq
      var phaseIncr = current[i] - prev[i] - ha * centerFreq
      // Due to the fact that the phase values are given in modulo 2π and, as
      // such, phase ‘jumps’ will occur, we need to unwrap the phase in order to
      // obtain a continuous phase function
      var unwrapped = phaseIncr - PI2 * round(phaseIncr / PI2)
      if (f === 547 && i > 200) {
        console.log(i, centerFreq, phaseIncr, unwrapped)
        console.log(current[i], prev[i], ha)
      }
      // Compute the instantaneous frequency ω for each freq. bin k
      // var realFreq = centerFreq + unwrapped / ha
      // Now, we can use ωk (realFreq) to compute the output phase spectra ∠Yi by
      // advancing the previous output ∠Yi−1 according to the synthesis hop
      // size Hs
      if (isNaN(unwrapped)) {
        console.log('NaN', numFrames, f, size, i)
        console.log('joder', prev[i], prev)
        throw Error('NaN')
      }
      current[i] = prev[i] + hs * (centerFreq + unwrapped / ha)
    }
    prev = current
  }
}

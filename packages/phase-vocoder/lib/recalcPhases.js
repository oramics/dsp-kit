const PI = Math.PI
const PI2 = 2 * PI

export default function recalcPhases (frames, { size, hop, factor, sampleRate }, omega) {
  const original = hop / sampleRate
  const modified = (hop * factor) / sampleRate

  const numFrames = frames.length
  for (let i = 2; i < numFrames; i++) {
    const prev = frames[i - 1]
    const current = frames[i]
    // for each frame, update each bin
    for (let bin = 0; bin < size; bin++) {
      // calculate the difference between phases
      const deltaPhi = current.phases[bin] - prev.phases[bin]
      // get the current band frequency
      const freq = omega[bin]
      // calculate the frequency deviation with the given hop size
      const deltaFreq = (deltaPhi / original) - freq
      // wrap the deviation
      var wrappedDeltaFreq = ((deltaFreq + PI) % PI2) - PI
      // and calculate the real frequency
      var realFreq = freq + wrappedDeltaFreq
      // update the phase
      current.phases[bin] = prev.phases[bin] + modified * realFreq
    }
  }
}

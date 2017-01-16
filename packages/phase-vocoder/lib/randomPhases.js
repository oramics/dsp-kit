const random = Math.random
const PI2 = 2 * Math.PI

/**
 * Set random phases of a collection of frames
 * @private
 */
export default function randomPhases (frames, { size }) {
  for (var n = 0; n < frames.length; n++) {
    var phases = frames[n].phases
    for (var i = 0; i < size; i++) {
      phases[i] = PI2 * random()
    }
  }
}

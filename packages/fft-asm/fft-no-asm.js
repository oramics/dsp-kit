'use strict'
// Checks if a number is a power of two
// https://github.com/mikolalysenko/bit-twiddle/blob/master/twiddle.js#L41
function isPow2 (v) { return !(v & (v - 1)) && (!!v) }

function fft (size, input, output, dir) {
  if (arguments.length > 1) return fft(size)(input, dir, output)
  var cached = tables(size)

  return function process (dir, input, output) {
    // check direction
    if (dir !== 'forward' && dir !== 'inverse') throw Error('Direction must be "forward" or "inverse" but was: ' + dir)
    var inverse = dir === 'inverse'

    // check input
    var rs = input.real || input
    var is = input.imag || cached.zeros
    if (rs.length !== size) throw Error('Invalid input real length: ' + rs.length + ' (must be ' + size + ')')
    if (is.length !== size) throw Error('Invalid input real length: ' + is.length + ' (must be ' + size + ')')

    // check output
    var real = output.real
    var imag = output.imag
    if (real.length !== size) throw Error('Invalid input real length: ' + real.length + ' (must be ' + size + ')')
    if (imag.length !== size) throw Error('Invalid input real length: ' + imag.length + ' (must be ' + size + ')')

    var phaseShiftStepReal, phaseShiftStepImag, currentPhaseShiftReal, currentPhaseShiftImag
    var off, tr, ti, tmpReal, rev
    var halfSize = 1
    var cosTable = cached.cosTable
    var sinTable = cached.sinTable
    var reverseTable = cached.reverseTable

    for (var i = 0; i < size; i++) {
      rev = reverseTable[i]
      real[i] = rs[rev]
      imag[i] = -1 * is[rev]
    }

    while (halfSize < size) {
      phaseShiftStepReal = cosTable[halfSize]
      phaseShiftStepImag = sinTable[halfSize]
      currentPhaseShiftReal = 1
      currentPhaseShiftImag = 0

      for (var fftStep = 0; fftStep < halfSize; fftStep++) {
        i = fftStep

        while (i < size) {
          off = i + halfSize
          tr = (currentPhaseShiftReal * real[off]) - (currentPhaseShiftImag * imag[off])
          ti = (currentPhaseShiftReal * imag[off]) + (currentPhaseShiftImag * real[off])

          real[off] = real[i] - tr
          imag[off] = imag[i] - ti
          real[i] += tr
          imag[i] += ti

          i += halfSize << 1
        }

        tmpReal = currentPhaseShiftReal
        currentPhaseShiftReal = (tmpReal * phaseShiftStepReal) - (currentPhaseShiftImag * phaseShiftStepImag)
        currentPhaseShiftImag = (tmpReal * phaseShiftStepImag) + (currentPhaseShiftImag * phaseShiftStepReal)
      }

      halfSize = halfSize << 1
    }

    // normalize
    if (inverse) {
      for (i = 0; i < size; i++) {
        real[i] /= size
        imag[i] /= size
      }
    }
    return output
  }
}

function tables (size) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, and was: ' + size)
  var reverseTable = new Uint32Array(size)
  var sinTable = new Float32Array(size)
  var cosTable = new Float32Array(size)
  var zeros = new Float32Array(size)
  var limit = 1
  var bit = size >> 1
  var i

  while (limit < size) {
    for (i = 0; i < limit; i++) {
      reverseTable[i + limit] = reverseTable[i] + bit
    }
    limit = limit << 1
    bit = bit >> 1
  }

  for (i = 0; i < size; i++) {
    sinTable[i] = Math.sin(-Math.PI / i)
    cosTable[i] = Math.cos(-Math.PI / i)
  }
  return { reverseTable, sinTable, cosTable, zeros }
}

module.exports = { fft: fft }

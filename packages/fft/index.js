'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function isPow2 (v) {
  return !(v & v - 1) && !!v
}
function _zeros (n) {
  return new Float32Array(n)
}

function fft (size, dir, complex, output) {
  if (arguments.length > 1) return fft(size)(dir, complex, output)

  var cached = tables(size)

  return function process (dir, complex, output) {
    dir = dir || 'forward'
    if (dir !== 'forward' && dir !== 'inverse') throw Error('Direction must be "forward" or "inverse", but was ' + dir)
    var inverse = dir === 'inverse'

    var rs = complex.real || complex
    var is = complex.imag || cached.zeros
    if (rs.length !== size) throw Error('Signal real length should be ' + size + ' but was ' + rs.length)
    if (is.length !== size) throw Error('Signal real length should be ' + size + ' but was ' + is.length)

    if (!output) output = { real: _zeros(size), imag: _zeros(size) }
    var _output = output,
        real = _output.real,
        imag = _output.imag
    var cosTable = cached.cosTable,
        sinTable = cached.sinTable,
        reverseTable = cached.reverseTable

    var phaseShiftStepReal, phaseShiftStepImag, currentPhaseShiftReal, currentPhaseShiftImag
    var off, tr, ti, tmpReal, i
    var halfSize = 1

    for (i = 0; i < size; i++) {
      real[i] = rs[reverseTable[i]]
      imag[i] = -1 * is[reverseTable[i]]
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
          tr = currentPhaseShiftReal * real[off] - currentPhaseShiftImag * imag[off]
          ti = currentPhaseShiftReal * imag[off] + currentPhaseShiftImag * real[off]

          real[off] = real[i] - tr
          imag[off] = imag[i] - ti
          real[i] += tr
          imag[i] += ti

          i += halfSize << 1
        }

        tmpReal = currentPhaseShiftReal
        currentPhaseShiftReal = tmpReal * phaseShiftStepReal - currentPhaseShiftImag * phaseShiftStepImag
        currentPhaseShiftImag = tmpReal * phaseShiftStepImag + currentPhaseShiftImag * phaseShiftStepReal
      }

      halfSize = halfSize << 1
    }

    if (inverse) {
      for (i = 0; i < size; i++) {
        real[i] /= size
        imag[i] /= size
      }
    }

    return output
  }
}

function tables(size) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, and was: ' + size)
  var reverseTable = new Uint32Array(size)
  var sinTable = _zeros(size)
  var cosTable = _zeros(size)
  var zeros = _zeros(size)
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
  return { reverseTable: reverseTable, sinTable: sinTable, cosTable: cosTable, zeros: zeros }
}

exports.fft = fft

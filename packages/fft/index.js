'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

function isPow2 (v) {
  return !(v & v - 1) && !!v
}
function _zeros (n) {
  return new Float32Array(n)
}

export function fft (size, dir, complex, output) {
  if (arguments.length > 1) return fft(size)(dir, complex, output)

  const cached = tables(size)

  return function process (dir, complex, output) {
    dir = dir || 'forward'
    if (dir !== 'forward' && dir !== 'inverse') throw Error('Direction must be "forward" or "inverse", but was ' + dir)
    const inverse = dir === 'inverse'

    const rs = complex.real || complex
    const is = complex.imag || cached.zeros
    if (rs.length !== size) throw Error('Signal real length should be ' + size + ' but was ' + rs.length)
    if (is.length !== size) throw Error('Signal real length should be ' + size + ' but was ' + is.length)

    if (!output) output = { real: _zeros(size), imag: _zeros(size) }
    const _output = output
    const real = _output.real
    const imag = _output.imag
    const cosTable = cached.cosTable
    const sinTable = cached.sinTable
    const reverseTable = cached.reverseTable

    let phaseShiftStepReal, phaseShiftStepImag, currentPhaseShiftReal, currentPhaseShiftImag
    let off, tr, ti, tmpReal, i
    let halfSize = 1

    for (i = 0; i < size; i++) {
      real[i] = rs[reverseTable[i]]
      imag[i] = -1 * is[reverseTable[i]]
    }

    while (halfSize < size) {
      phaseShiftStepReal = cosTable[halfSize]
      phaseShiftStepImag = sinTable[halfSize]
      currentPhaseShiftReal = 1
      currentPhaseShiftImag = 0

      for (let fftStep = 0; fftStep < halfSize; fftStep++) {
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

function tables (size) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, and was: ' + size)
  const reverseTable = new Uint32Array(size)
  const sinTable = _zeros(size)
  const cosTable = _zeros(size)
  const zeros = _zeros(size)
  let limit = 1
  let bit = size >> 1
  let i

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

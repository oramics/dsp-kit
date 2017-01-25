var almost = require('almost-equal')
const test = require('tst')
const assert = require('assert')
const dft = require('dsp-dft')
const dspjs = require('dspjs')
const dspkit = require('..')
const { PI, sin, cos } = Math
const arr = require('dsp-array')

function round (a) { return arr.round(a, 8) }

test('small signal against dft', function () {
  const size = 8
  const signal = arr.fill(size, (n, N) => sin(n / N) + cos(0.5 * n / N))
  const dftFreqDomain = dft.dft('forward', signal)
  const fftFreqDomain = dspkit.fft(size, 'forward', signal)
  assert.almost(fftFreqDomain.real, dftFreqDomain.real)
  assert.almost(fftFreqDomain.imag, dftFreqDomain.imag)

  // inverse-able
  const dftTimeDomain = dft.dft('inverse', dftFreqDomain)
  const fftTimeDomain = dspkit.fft(size, 'inverse', fftFreqDomain)
  assert.almost(fftTimeDomain.real, signal)
  assert.almost(fftTimeDomain.real, dftTimeDomain.real)
  assert.almost(fftTimeDomain.imag, new Float32Array(size))
})

test('common signal against legacy dspjs', () => {
  const size = 1024

  // create signal
  var signal = arr.fill(size, (n, N) => sin(n / N) - cos(n / N + 0.75 * PI))
  assert.equal(Math.max(...signal), 1.8182117098462318)

  // forward
  var legacy = new dspjs.FFT(size, 44100)
  legacy.forward(signal)
  const legacyFreqDomain = { real: legacy.real, imag: legacy.imag }
  const fftFreqDomain = dspkit.fft(size, 'forward', signal)
  const dftFreqDomain = dft.dft('forward', signal)

  assert.almost(fftFreqDomain.real, legacyFreqDomain.real, 'fft vs legacy (real)')
  assert.almost(fftFreqDomain.imag, legacyFreqDomain.imag)
  assert.almost(fftFreqDomain.real, dftFreqDomain.real)
  assert.almost(fftFreqDomain.imag, dftFreqDomain.imag)

  // inverse
  const legacyTimeDomain = legacy.inverse(legacyFreqDomain.real, legacyFreqDomain.imag)
  const fftTimeDomain = dspkit.fft(size, 'inverse', fftFreqDomain)
  const dftTimeDomain = dft.dft('inverse', dftFreqDomain)
  assert.almost(fftTimeDomain.real, legacyTimeDomain)
  assert.almost(fftTimeDomain.real, dftTimeDomain.real)
  assert.almost(fftTimeDomain.imag, dftTimeDomain.imag)
})

const isNum = (x) => typeof x === 'number' && !isNaN(x)

test('semi real example', function () {
  const SIZE = 1024
  const WINDOW = 128
  const HOP = 40
  const signal = arr.fill(SIZE, (n, N) => sin(2 * PI * (n / (N - 1))))
  const window = arr.fill(WINDOW, (n, N) => 0.5 * (1 - cos(2 * PI * n / (N - 1))))
  const buffer = arr.zeros(WINDOW)
  const win = arr.zeros(WINDOW)
  const complex = { real: arr.zeros(WINDOW), imag: arr.zeros(WINDOW) }
  const fft = dspkit.fft(WINDOW)
  var legacy = new dspjs.FFT(WINDOW, 44100)
  const result = []
  for (var i = 0; i < SIZE; i += HOP) {
    buffer.set(signal.subarray(i, i + WINDOW))
    assert(arr.testAll(WINDOW, isNum, buffer), 'subarray')
    arr.mult(buffer, window, win)
    assert(arr.testAll(WINDOW, isNum, win), 'window')
    fft('forward', buffer, complex)
    legacy.forward(buffer)
    assert.almost(complex.real, legacy.real)
    result.push(arr.testAll(WINDOW, isNum, complex.real))
  }
  const num = Math.floor(SIZE / HOP) + 1
  assert.equal(result.length, num)
  const expected = arr.fill(num, () => true)
  assert.almost(result, expected)
})

assert.almost = function (x, y, message) {
  if (x.length && y.length) {
    return x.every(function (x, i) {
      return assert.almost(x, y[i], (message || '') + ' - index: ' + i)
    })
  }

  // FIXME: take a look to this, is too low?
  var EPSILON = 10e-4
  if (!almost(x, y, EPSILON)) assert.fail(x, y, `${x} ≈ ${y}`, '≈ ' + message)
  return true
}

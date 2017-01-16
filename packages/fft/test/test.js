const test = require('tst')
const assert = require('assert')
const dft = require('dsp-dft')
const dspjs = require('dspjs')
const dspkit = require('..')
const { PI, sin, cos } = Math
const arr = require('dsp-array')

test('small signal against dft', function () {
  const size = 8
  const signal = arr.gen(size, (n, N) => sin(n / N) + cos(0.5 * n / N))
  const dftFreqDomain = dft.dft(signal)
  const fftFreqDomain = dspkit.fft(size, signal)
  assert.deepEqual(arr.round(fftFreqDomain.real), arr.round(dftFreqDomain.real))
  assert.deepEqual(arr.round(fftFreqDomain.imag), arr.round(dftFreqDomain.imag))

  // inverse-able
  const dftTimeDomain = dft.idft(dftFreqDomain)
  const fftTimeDomain = dspkit.ifft(size, fftFreqDomain)
  assert.deepEqual(arr.round(fftTimeDomain.real), arr.round(signal))
  assert.deepEqual(arr.round(fftTimeDomain.real), arr.round(dftTimeDomain.real))
  assert.deepEqual(arr.round(fftTimeDomain.imag), new Float64Array(size))
})

test('common signal against legacy dspjs', () => {
  const size = 1024

  // create signal
  var signal = arr.gen(size, (n, N) => sin(n / N) - cos(n / N + 0.75 * PI))
  assert.equal(Math.max(...signal), 1.8182117098462318)

  // forward
  var legacy = new dspjs.FFT(size, 44100)
  legacy.forward(signal)
  const legacyFreqDomain = { real: legacy.real, imag: legacy.imag }
  const fftFreqDomain = dspkit.fft(size, signal)
  const dftFreqDomain = dft.dft(signal)

  assert.deepEqual(arr.round(fftFreqDomain.real), arr.round(legacyFreqDomain.real))
  assert.deepEqual(arr.round(fftFreqDomain.imag), arr.round(legacyFreqDomain.imag))
  assert.deepEqual(arr.round(fftFreqDomain.real), arr.round(dftFreqDomain.real))
  assert.deepEqual(arr.round(fftFreqDomain.imag), arr.round(dftFreqDomain.imag))

  // inverse
  const legacyTimeDomain = legacy.inverse(legacyFreqDomain.real, legacyFreqDomain.imag)
  const fftTimeDomain = dspkit.ifft(size, fftFreqDomain)
  const dftTimeDomain = dft.idft(dftFreqDomain)
  assert.deepEqual(arr.round(fftTimeDomain.real), arr.round(legacyTimeDomain))
  assert.deepEqual(arr.round(fftTimeDomain.real), arr.round(dftTimeDomain.real))
  assert.deepEqual(arr.round(fftTimeDomain.imag), arr.round(dftTimeDomain.imag))
})

const isNum = (x) => typeof x === 'number' && !isNaN(x)

test('semi real example', function () {
  const SIZE = 1024
  const WINDOW = 128
  const HOP = 40
  const signal = arr.gen(SIZE, (n, N) => sin(2 * PI * (n / (N - 1))))
  const window = arr.gen(WINDOW, (n, N) => 0.5 * (1 - cos(2 * PI * n / (N - 1))))
  const buffer = arr.zeros(WINDOW)
  const win = arr.zeros(WINDOW)
  const complex = { real: arr.zeros(WINDOW), imag: arr.zeros(WINDOW) }
  const forward = dspkit.fft(WINDOW)
  var legacy = new dspjs.FFT(WINDOW, 44100)
  const result = []
  for (var i = 0; i < SIZE; i += HOP) {
    buffer.set(signal.subarray(i, i + WINDOW))
    assert(arr.testAll(WINDOW, isNum, buffer), 'subarray')
    arr.mult(buffer, window, win)
    assert(arr.testAll(WINDOW, isNum, win), 'window')
    forward(buffer, complex)
    legacy.forward(buffer)
    assert.deepEqual(complex.real, legacy.real)
    result.push(arr.testAll(WINDOW, isNum, complex.real))
  }
  const num = Math.floor(SIZE / HOP) + 1
  assert.equal(result.length, num)
  const expected = arr.gen(num, () => true)
  assert.deepEqual(result, expected)
})

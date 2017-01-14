const test = require('tst')
const assert = require('assert')
const dft = require('dsp-dft')
const dspjs = require('dspjs')
const dspkit = require('..')
const { PI, sin, cos } = Math
const { generate, round } = require('dsp-array')

test('generate', function () {
  // we don't want generate to fail and break our tests
  const signal = generate(10, (n, N) => sin(n / N))
  assert.deepEqual(signal, Float64Array.from([0, 0.09983341664682815, 0.19866933079506122, 0.29552020666133955, 0.3894183423086505, 0.479425538604203, 0.5646424733950354, 0.644217687237691, 0.7173560908995228, 0.7833269096274834]))
  assert.equal(Math.max(...signal), 0.7833269096274834)
})

test('small signal against dft', function () {
  const size = 8
  const signal = generate(size, (n, N) => sin(n / N) + cos(0.5 * n / N))
  const dftFreqDomain = dft.dft(signal)
  const fftFreqDomain = dspkit.fft(size, signal)
  assert.deepEqual(round(fftFreqDomain.real), round(dftFreqDomain.real))
  assert.deepEqual(round(fftFreqDomain.imag), round(dftFreqDomain.imag))

  // inverse-able
  const dftTimeDomain = dft.idft(dftFreqDomain)
  const fftTimeDomain = dspkit.ifft(size, fftFreqDomain)
  assert.deepEqual(round(fftTimeDomain.real), round(signal))
  assert.deepEqual(round(fftTimeDomain.real), round(dftTimeDomain.real))
  assert.deepEqual(round(fftTimeDomain.imag), new Float64Array(size))
})

test('common signal against legacy dspjs', () => {
  const size = 1024

  // create signal
  var signal = generate(size, (n, N) => sin(n / N) - cos(n / N + 0.75 * PI))
  assert.equal(Math.max(...signal), 1.8182117098462318)

  // forward
  var legacy = new dspjs.FFT(size, 44100)
  legacy.forward(signal)
  const legacyFreqDomain = { real: legacy.real, imag: legacy.imag }
  const fftFreqDomain = dspkit.fft(size, signal)
  const dftFreqDomain = dft.dft(signal)

  assert.deepEqual(round(fftFreqDomain.real), round(legacyFreqDomain.real))
  assert.deepEqual(round(fftFreqDomain.imag), round(legacyFreqDomain.imag))
  assert.deepEqual(round(fftFreqDomain.real), round(dftFreqDomain.real))
  assert.deepEqual(round(fftFreqDomain.imag), round(dftFreqDomain.imag))

  // inverse
  const legacyTimeDomain = legacy.inverse(legacyFreqDomain.real, legacyFreqDomain.imag)
  const fftTimeDomain = dspkit.ifft(size, fftFreqDomain)
  const dftTimeDomain = dft.idft(dftFreqDomain)
  assert.deepEqual(round(fftTimeDomain.real), round(legacyTimeDomain))
  assert.deepEqual(round(fftTimeDomain.real), round(dftTimeDomain.real))
  assert.deepEqual(round(fftTimeDomain.imag), round(dftTimeDomain.imag))
})

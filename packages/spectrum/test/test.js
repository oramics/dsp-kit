/* eslint-disable comma-spacing */
const test = require('tst')
const assert = require('assert')
const dspjs = require('dspjs')
const fft = require('dsp-fft')
const spectrum = require('..')
const { fill, round } = require('dsp-array')

function from (...v) { return Float64Array.from(v) }

test('band width', function () {
  const old = new dspjs.FFT(2048, 44100)
  assert.equal(spectrum.bandWidth(2048, 44100), old.bandwidth)
})

test('center frequency', function () {
  const old = new dspjs.FFT(2048, 44100)
  for (let i = 0; i < 100; i += 10) {
    assert.equal(spectrum.bandFrequency(i, 2048, 44100), old.getBandFrequency(i))
  }
})

test('spectrum', function () {
  const size = 64
  const signal = fill(size, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  const old = new dspjs.FFT(size, 44100)
  old.forward(signal)
  // the result from the dsp.js is divided by `2 / size` so we have to denormalize
  const magnitudes = old.spectrum.map((n) => n * size / 2)
  const polar = spectrum.polar(fft.fft(size, signal))
  // by default the length of magnitures array is the same length as signal
  // although some simmetry can be found
  assert.deepEqual(polar.magnitudes.length, size)
  assert.deepEqual(polar.magnitudes.slice(0, magnitudes.length), magnitudes)
})

test('rectangular form', function () {
  const size = 8
  const signal = fill(size, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  const complex = fft.fft(size, signal)
  const polar = spectrum.polar(complex)
  const rect = spectrum.rectangular(polar)
  assert.deepEqual(round(rect.real), round(complex.real))
})

test('phase unwrap', function () {
  const positive = fill(10, (i) => i % (2 * Math.PI))
  assert.deepEqual(positive, from(0,1,2,3,4,5,6,0.7168146928204138,1.7168146928204138,2.7168146928204138))
  assert.deepEqual(spectrum.unwrap(positive), from(0,1,2,3,4,5,6,7,8,9))
  const negative = fill(10, (i) => -i % (2 * Math.PI))
  assert.deepEqual(negative, from(0,-1,-2,-3,-4,-5,-6,-0.7168146928204138,-1.7168146928204138,-2.7168146928204138))
  assert.deepEqual(spectrum.unwrap(negative), from(0,-1,-2,-3,-4,-5,-6,-7,-8,-9))
})

test('phase unwrap in place', function () {
  var signal = fill(1024, (i) => i % (2 * Math.PI))
  var unwrapped = spectrum.unwrap(signal)
  spectrum.unwrap(signal, signal)
  assert.deepEqual(signal, unwrapped)
})

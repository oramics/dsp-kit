const test = require('tst')
const assert = require('assert')
const dspjs = require('dspjs')
const buffer = require('dsp-buffer')
const fft = require('dsp-fft')
const fd = require('..')

function FFT (size = 2048, rate = 44100) {
  return new dspjs.FFT(size, rate)
}

test('band width', function () {
  const old = FFT()
  assert.equal(fd.bandWidth(old.bufferSize, old.sampleRate), old.bandwidth)
})

test('center frequency', function () {
  const old = FFT()
  for (let i = 0; i < 100; i += 10) {
    assert.equal(fd.bandFrequency(i, old.bufferSize, old.sampleRate), old.getBandFrequency(i))
  }
})

test('spectrum', function () {
  const signal = buffer.generate(64, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  const old = FFT(64)
  old.forward(signal)
  const spectrum = fd.spectrum(fft.fft(signal))
  assert.deepEqual(spectrum.magnitudes, old.spectrum)
})

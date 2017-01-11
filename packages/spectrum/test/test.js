const test = require('tst')
const assert = require('assert')
const dspjs = require('dspjs')
const buffer = require('dsp-buffer')
const fft = require('dsp-fft')
const { bandFrequency, bandWidth, spectrum } = require('..')

function FFT (size = 2048, rate = 44100) {
  return new dspjs.FFT(size, rate)
}

test('band width', function () {
  const old = FFT()
  assert.equal(bandWidth(old.bufferSize, old.sampleRate), old.bandwidth)
})

test('center frequency', function () {
  const old = FFT()
  for (let i = 0; i < 100; i += 10) {
    assert.equal(bandFrequency(i, old.bufferSize, old.sampleRate), old.getBandFrequency(i))
  }
})

test('spectrum', function () {
  const signal = buffer.generate(64, (n, N) => Math.sin(2 * Math.PI * n / (N - 1)))
  const old = FFT(64)
  old.forward(signal)
  const spec = spectrum(fft.fft(64)(signal))
  assert.deepEqual(spec.magnitudes, old.spectrum)
})

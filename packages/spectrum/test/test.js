const test = require('tst')
const assert = require('assert')
const dspjs = require('dspjs')
const fd = require('..')

function FFT (size = 2048, rate = 44100) {
  return new dspjs.FFT(size, rate)
}

test('band width', function () {
  const fft = FFT()
  assert.equal(fd.bandWidth(fft.bufferSize, fft.sampleRate), fft.bandwidth)
})

test('center frequency', function () {
  const fft = FFT()
  for (let i = 0; i < 100; i += 10) {
    assert.equal(fd.bandFrequency(i, fft.bufferSize, fft.sampleRate), fft.getBandFrequency(i))
  }
})

test('spectrum', function () {

})

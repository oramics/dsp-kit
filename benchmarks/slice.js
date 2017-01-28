/**
 * Trying to discover the fastest rotate algorithm for fft centering
 * It would be nice to have reusable buffers
 */
var benchmark = require('./support/benchmark')
var assert = require('assert')
var dsp = require('../packages/dsp')

var signal = dsp.fill(1024, (x) => 1)
var checker = dsp.fill(512, (x) => 1)
assert.deepEqual(signal.slice(0, 512), checker)
var cache = dsp.zeros(512)

function sliceFor (input, output) {
  var l = input.length
  if (!output) output = new Float64Array(l)
  for (var i = 0; i < l; i++) output[i] = input[i]
  return output
}

function sliceSet (input, output) {
  if (!output) output = new Float64Array(input.length)
  output.set(input)
  return output
}

benchmark({
  'slice': () => signal.slice(0, 512),
  'slice-for': () => sliceFor(signal.subarray(0, 512)),
  'slice-for with cache': () => sliceFor(signal.subarray(0, 512), cache),
  'slice-set': () => sliceSet(signal.subarray(0, 512)),
  'slice-set with cache': () => sliceSet(signal.subarray(0, 512), cache)
})

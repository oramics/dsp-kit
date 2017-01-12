/**
 * Trying to discover the fastest rotate algorithm for fft centering
 * It would be nice to have reusable buffers
 */
var Benchmark = require('Benchmark')
var assert = require('assert')
var buffer = require('../packages/buffer')
var dsp = require('../packages/dsp')

var SIZE = 1024 * 1 + 1
var signal = buffer.generate(SIZE, (x) => x)
var cache = buffer.zeros(SIZE)

function rotateInPlace (src, n) {
  var len = src.length
  var k = (n % len + len) % len
  if (k > 0) {
    reverse(src, 0, k)
    reverse(src, k, len)
    reverse(src, 0, len)
  }
  return src
}
function reverse (src, from, to) {
  --from
  while (++from < --to) {
    var tmp = src[from]
    src[from] = src[to]
    src[to] = tmp
  }
}

function rotateLoop (src, n, output) {
  var len = src.length
  if (!output) output = new Float64Array(len)
  for (var i = 0; i < len; i++) output[i] = src[(i + (len + n % len)) % len]
  return output
}

var toTest = [rotateLoop, rotateInPlace]
toTest.forEach((rotate) => {
  var tester = buffer.generate(5, (x) => x)
  assert.deepEqual(tester, Float64Array.from([0, 1, 2, 3, 4]))
  assert.deepEqual(rotate(tester, 3), Float64Array.from([3, 4, 0, 1, 2]))
})

function clone (src) {
  var len = src.length
  var dest = new Float32Array(len)
  for (var i = 0; i < len; i++) dest[i] = src[i]
  return dest
}

new Benchmark.Suite()
.add('rotate in place', function () {
  rotateInPlace(signal, 512)
})
.add('rotate in place with slice', function () {
  rotateInPlace(signal.slice(), 512)
})
.add('rotate in place with clone', function () {
  rotateInPlace(clone(signal), 512)
})
.add('rotate loop', function () {
  rotateLoop(signal, 512)
})
.add('rotate loop reuse buffer', function () {
  rotateLoop(signal, 512, cache)
})
.add('fftshift reuse buffer', () => {
  dsp.fftshift(signal, cache)
})
.on('cycle', function (event) {
  console.log(String(event.target))
})
.on('complete', function () {
  console.log('Fastest is ', this.filter('fastest').map('name'))
})
.on('error', function (e) {
  console.error('ERROR', e)
})
.run({ 'async': true })

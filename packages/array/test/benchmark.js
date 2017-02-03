var benchmark = require('dsp-benchmark')
var arr = require('..')

var SIZE = 1024 * 10
var heap32 = new Float32Array(SIZE)
var heap64 = new Float64Array(SIZE)

benchmark('Typed array creation', {
  'create Float32Array': () => new Float32Array(SIZE),
  'create Float64Array': () => new Float64Array(SIZE)
})

benchmark('Fill arrays', {
  'Fill 32bit': () => arr.fill(heap32, (x) => x),
  'Fill 64bit': () => arr.fill(heap64, (x) => x)
})

/*
 * A small layer over Benchmark to reduce boilerplate
 * This is an internal package (not published)
 */
var Benchmark = require('Benchmark')

/*
 * @example
 * var benchmark = require('dsp-benchmark')
 * benchmark({
 * one: () => someExpensiveOperation(),
 * two: () => someOtherExpensiveOperation()
 * })
 */
function benchmark (title, suite, { run = true, out = console } = {}) {
  out.log('Benchmark -- ', title)
  var bench = new Benchmark.Suite()
  Object.keys(suite).forEach((k) => {
    bench.add(k, suite[k])
  })
  bench.on('cycle', function (event) {
    out.log(String(event.target))
  })
  .on('complete', function () {
    out.log('Fastest is ', this.filter('fastest').map('name'))
  })
  .on('error', function (e) {
    out.error('ERROR', e)
  })

  if (run) bench.run({ 'async': false })
}

benchmark.skip = function (title, suite, { out = console } = {}) {
  out.log('Skip -- ', title)
}

module.exports = benchmark

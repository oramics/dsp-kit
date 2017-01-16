/**
 * A small layer over Benchmark to reduce boilerplate
 */
var Benchmark = require('Benchmark')

module.exports = function benchmark (suite, { run = true } = {}) {
  var bench = new Benchmark.Suite()
  Object.keys(suite).forEach((k) => {
    bench.add(k, suite[k])
  })
  bench.on('cycle', function (event) {
    console.log(String(event.target))
  })
  .on('complete', function () {
    console.log('Fastest is ', this.filter('fastest').map('name'))
  })
  .on('error', function (e) {
    console.error('ERROR', e)
  })

  if (run) bench.run({ 'async': true })
}

var almost = require('almost-equal')

module.exports = function (assert) {
  var EPSILON = 10e-4
  assert.almost = function (x, y, epsilon, message) {
    epsilon = epsilon || EPSILON
    if (x.length && y.length) {
      return x.every(function (x, i) {
        return assert.almost(x, y[i], epsilon, (message || '') + ' - index: ' + i)
      })
    }

    if (!almost(x, y, epsilon)) assert.fail(x, y, `${x} ≈ ${y}`, '≈ ' + message + '(' + epsilon + ')')
    return true
  }
}

/**
 * > timestretch audio in the browser
 *
 * It bridges the web audio api (audio buffers, audio workers) with the
 * timestretch functions of dsp-kit
 *
 * Will be published as an independent module
 */

var ola = require('dsp-ola')
var ac = require('audio-context')

function stretch (factor, buffer, context) {
  context = context || ac
  var stretch = ola.overlapAdd({ size: 512, hop: 256 })
  var result = stretch(factor, buffer.getChannelData(0))
  var buffer = ac.createBuffer(1, result.length, ac.sampleRate)
  buffer.copyToChannel(result, 0)
  return buffer
}

module.exports = { stretch: stretch }

/**
 * > timestretch audio in the browser
 *
 * It bridges the web audio api (audio buffers, audio workers) with the
 * timestretch functions of dsp-kit
 *
 * Will be published as an independent module
 */

var ola = require('dsp-ola')
var pv = require('dsp-phase-vocoder')
var ac = require('audio-context')

function stretch (factor, buffer, context) {
  context = context || ac
  var stretch = ola.overlapAdd({ size: 512, hop: 256 })
  var result = stretch(factor, buffer.getChannelData(0))
  var buffer = ac.createBuffer(1, result.length, ac.sampleRate)
  buffer.copyToChannel(result, 0)
  return buffer
}

function vocoder(factor, buffer, context) {
  console.log('phase vocoder!')
  var stretch = phaseVocoder({ size: 512, hop: 125 })
  var result = stretch(factor, buffer.getChannelData(0))
}

// TODO: move this inside phase-vocoder
function phaseVocoder(params) {
  return function stretch(factor, data) {
    var frames = pv.analysis(data, params)
    console.log('We have frames', frames.length)
  }
}
module.exports = { stretch, vocoder }

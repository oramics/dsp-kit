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
  return toAudioBuffer(stretch(factor, buffer.getChannelData(0)))
}

function toAudioBuffer (left) {
  var len = left.length
  var buffer = ac.createBuffer(1, len, ac.sampleRate)
  var data = buffer.getChannelData(0)
  for (var i = 0; i < len; i++) {
    data[i] = left[i]
  }
  return buffer
}

function vocoder (factor, buffer, context) {
  console.log('phase vocoder!')
  var stretch = phaseVocoder()
  return toAudioBuffer(stretch(factor, buffer.getChannelData(0)))
}

// TODO: move this inside phase-vocoder
function phaseVocoder ({ size = 512, hop = 125, sampleRate = 44100 } = {}) {
  return function stretch (factor, data) {
    var frames = pv.analysis(data, { size, hop })
    console.log('We have frames', frames.length)
    console.log(frames[1000])
    return pv.synthesis(frames, { hop, sampleRate })
  }
}
module.exports = { stretch, vocoder }

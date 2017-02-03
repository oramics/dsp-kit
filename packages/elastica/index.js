/**
 * > timestretch audio in the browser
 *
 * It bridges the web audio api (audio buffers, audio workers) with the
 * timestretch functions of dsp-kit
 *
 * Will be published as an independent module
 *
 * @module elastica
 */

var pv = require('dsp-phase-vocoder')
var ac = require('audio-context')

/**
 * Perform time-stretch to an audio buffer
 *
 * @param {Number} factor - the stretch factor (< 1 reduce duration, > 1 expand duration)
 * @param {AudioBuffer} buffer - a WebAudio's AudioBuffer
 * @param {Object} [options] - An optional object with configuration:
 *
 * - {String} algorithm = 'phase-vocoder': the algorithm to be use.
 * Valid values are: 'phase-vocoder', 'ola', 'paul-stretch'. Default: 'phase-vocoder'
 * - {Integer} size = 4096: the frame size
 * - {Integer} hop = 1024: the hop size
 * - {AudioContext} context: the audio context to use (or use 'audio-context' npm package)
 *
 * @return {AudioBuffer} a new audio buffer
 */
function stretch (factor, buffer, options = {}) {
  var stretch = pv.phaseVocoder(options)
  var data = buffer.getChannelData(0)
  return toAudioBuffer(stretch(factor, data))
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
  var stretch = pv.phaseVocoder()
  return toAudioBuffer(stretch(factor, buffer.getChannelData(0)))
}

function paulStretch (factor, buffer, context) {
  console.log('paul stretch algorithm')
  var stretch = pv.paulStretch()
  return toAudioBuffer(stretch(factor, buffer.getChannelData(0)))
}

// TODO: move this inside phase-vocoder
module.exports = { stretch, vocoder, paulStretch }

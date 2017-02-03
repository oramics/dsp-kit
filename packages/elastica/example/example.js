/* global fetch */
var h = require('h')
var waa = require('dsp-waa')
var elastica = require('..')

const append = (el) => document.body.appendChild(el)
const put = (str, tag = 'p') => append(h(tag, str))
const player = (buffer, opts) => {
  append(h('a', { href: '#!', click: waa.player(buffer, opts) }, 'Play'))
}

put('Elastica example', 'h1')

fetch('example/amen-mono.wav').then(waa.decodeArrayBuffer())
.then((buffer) => {
  put('Sample amen-mono-wav loaded')
  put('Duration: ' + buffer.length / 44100)
  player(buffer, { loop: true, gain: 0.3 })
  return buffer
})
.then((buffer) => {
  put('Stretch amen-mono.wav overlap and add')
  var bufferOLA = elastica.stretch(1, buffer, { algorithm: 'ola' })
  put('Duration: ' + bufferOLA.length / 44100)
  player(bufferOLA, { loop: true, gain: 0.3 })
})

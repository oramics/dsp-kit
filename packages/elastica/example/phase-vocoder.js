var h = require('h')
var ac = require('audio-context')
var draw = require('draw-waveform')
var elastica = require('..')
var decodeArrayBuffer = require('./decode-array-buffer')

const add = (el) => { document.body.appendChild(el); return el }

Promise.resolve('Phase vocoder elastica example')
.then((title) => {
  add(h('h1', 'Phase vocoder elastica example'))
})
.then(() => {
  // load buffer
  add(h('p', 'Loading sound...'))
  return fetch('example/amen-mono.wav').then(decodeArrayBuffer())
})
.then((buffer) => {
  // draw buffer
  draw(add(h('canvas', { width: 600, height: 300 })), buffer.getChannelData(0))
  return buffer
})
.then((buffer) => {
  // perform time stretch
  elastica.vocoder(1.2, buffer)
})

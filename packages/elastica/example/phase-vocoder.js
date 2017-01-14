/* global fetch */
var h = require('h')
var draw = require('draw-waveform')
var elastica = require('..')
var decodeArrayBuffer = require('./lib/decode-array-buffer')
var player = require('./lib/player.js')

const add = (el) => { document.body.appendChild(el); return el }
const canvas = (opts) => h('canvas', opts)

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
  var c = canvas({ width: 600, height: 300, onClick: player(buffer) })
  c.onclick = player(buffer)
  draw(add(c), buffer.getChannelData(0))
  return buffer
})
.then((buffer) => {
  // perform time stretch
  return elastica.paulStretch(10, buffer)
})
.then((stretched) => {
  var c = canvas({ width: 600, height: 300 })
  c.onclick = player(stretched)
  draw(add(c), stretched.getChannelData(0))
})

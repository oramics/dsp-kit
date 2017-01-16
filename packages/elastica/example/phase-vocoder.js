/* global fetch */
var h = require('h')
var waa = require('dsp-waa')
var elastica = require('..')

const add = (el) => { document.body.appendChild(el); return el }
const canvas = (opts) => h('canvas', opts)

Promise.resolve('Phase vocoder elastica example')
.then((title) => {
  add(h('h1', 'Phase vocoder elastica example'))
})
.then(() => {
  // load buffer
  add(h('p', 'Loading sound...'))
  return fetch('example/amen-mono.wav').then(waa.decodeArrayBuffer())
})
.then((buffer) => {
  // draw buffer
  var c = canvas({ width: 600, height: 300 })
  c.onclick = waa.player(buffer, true)
  waa.drawWaveform(add(c), buffer.getChannelData(0))
  return buffer
})
.then((buffer) => {
  // perform time stretch
  return elastica.vocoder(1.2, buffer)
})
.then((stretched) => {
  console.log('joder', stretched.length, stretched.length / 44100)
  var c = canvas({ width: 600, height: 300 })
  c.onclick = waa.player(stretched, true)
  waa.drawWaveform(add(c), stretched.getChannelData(0))
})

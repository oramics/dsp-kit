var waa = require('dsp-waa')
var h = require('h')
var dsp = require('..')
var buffer = require('dsp-buffer')

const add = (el) => { document.body.appendChild(el); return el }
const canvas = ({ width = 1024, height = 200 } = {}) => h('canvas', { width, height })

add(h('h1', 'Oscillator example'))

var generate = dsp.oscillator({ type: 'saw', defaultSize: 1024 })

waa.drawWaveform(add(canvas()), generate())
waa.drawWaveform(add(canvas()), generate({ frequency: 880 }))
const concat = buffer.concat(generate({ size: 512 }), generate({ size: 512 }))
waa.drawWaveform(add(canvas()), concat)
var c = waa.drawWaveform(add(canvas()), generate({ frequency: 1600, size: 44100 }))
c.onclick = waa.player(waa.toAudioBuffer(c.waveData), false)

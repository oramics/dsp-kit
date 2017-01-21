var h = require('h')
var spectrum = require('..')
var arr = require('dsp-array')
var waa = require('dsp-waa')
var fft = require('dsp-fft')

const add = (el) => { document.body.appendChild(el); return el }
const canvas = ({ width = 1024, height = 150 } = {}) => h('canvas', { width, height })

add(h('h1', 'Unwrap phase examples'))


var signal = arr.fill(1024, (n, N) => Math.sin(10 * 2 * Math.PI * n / (N - 1)))

add(h('h3', 'Signal'))
waa.drawWaveform(add(canvas()), signal)

var { magnitudes, phases } = spectrum.polar(fft.fft(1024, signal))

add(h('h3', 'Magnitudes'))
waa.drawWaveform(add(canvas()), magnitudes)
add(h('h3', 'Wrapped phases'))
waa.drawWaveform(add(canvas()), phases)
add(h('h3', 'Unwrapped phases'))
waa.drawWaveform(add(canvas()), spectrum.unwrap(phases))

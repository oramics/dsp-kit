
var fs = require('fs')
var arr = require('dsp-array')
var noise = require('dsp-noise')

var SIZE = 4096

var signal = arr.fill(SIZE, noise.white())
fs.writeFileSync('noise4096.json', JSON.stringify(Array.from(signal)))

/* global performance */
var dspjs = require('dspjs')
var asm = require('..')
var arr = require('dsp-array')

var TIMES = 10000
var SIZE = 1024
var signal = arr.fill(SIZE, () => Math.random() * 2 - 0.5)
var fft = new dspjs.FFT(signal.length, 44100)
var asmfft = asm.fft(SIZE)
var output = { real: signal.slice(), imag: arr.zeros(signal.length) }
var zeros = arr.zeros(SIZE)

function addElement (name, profiler) {
  var div = document.createElement('div')
  div.innerHTML = name
  div.onclick = profiler
  document.body.appendChild(div)
}

function profileDSP () {
  console.log('dspjs...')
  var t0 = performance.now()
  for (var i = 0; i < TIMES; i++) {
    fft.forward(signal)
  }
  var t1 = performance.now()
  report('DSP', t0, t1)
}
function profileASM () {
  console.log('asm version...')
  var t0 = performance.now()
  var complex = { real: signal, imag: zeros }
  for (var i = 0; i < TIMES; i++) {
    asmfft('forward', complex, output)
  }
  var t1 = performance.now()
  report('ASM', t0, t1)
}

function report (name, t0, t1) {
  console.log(name + ' time: ', t1 - t0)
}

addElement('dsp.js', profileDSP)
addElement('asm.js', profileASM)

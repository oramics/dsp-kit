var draw = require('draw-waveform')
var addCanvas = require('add-canvas')
var array = require('..')

var constant = array.fill(600, (x) => 1)
draw(addCanvas(600), constant)

var sine = array.fill(600, (n, N) => Math.sin(10 * 2 * Math.PI * n / (N - 1)))
draw(addCanvas(600), sine)

const hamming = () => (n, N) => 0.54 - 0.46 * Math.cos(2 * Math.PI * n / (N - 1))
var window = array.fill(600, hamming())
draw(addCanvas(600), window)

var mult = array.mult(constant, window)
draw(addCanvas(600), mult)

var dest = array.zeros(1200)
array.copy(window, dest)
array.add(window, dest, dest, 0, 300, 300)
array.add(window, dest, dest, 0, 600, 600)
draw(addCanvas(600), dest)

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
window.dsp = require('./build/index.js')

},{"./build/index.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function zeros(size) {
  return new Float64Array(size);
}

function fill(N, fn, output) {
  if (arguments.length < 3) output = zeros(N);
  for (var n = 0; n < N; n++) {
    output[n] = fn(n, N);
  }return output;
}

function concat(a, b) {
  var dest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var offset = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var al = a.length;
  var bl = b.length;
  if (dest === null) dest = zeros(al + bl + offset);
  for (var i = 0; i < al; i++) {
    dest[i + offset] = a[i];
  }for (var _i = 0; _i < bl; _i++) {
    dest[_i + al + offset] = b[_i];
  }return dest;
}

function add(N, a, b, out) {
  out = out || zeros(N);
  for (var i = 0; i < N; i++) {
    out[i] = a[i] + b[i];
  }return out;
}

function mult(N, a, b, out) {
  out = out || zeros(N);
  for (var i = 0; i < N; i++) {
    out[i] = a[i] * b[i];
  }return out;
}



var isSame = Object.is;

var round = roundTo(8);

function roundTo(dec) {
  return function round(arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : dec;
    var output = arguments[2];

    var size = arr.length;
    if (!output) output = new Float64Array(size);
    var limit = Math.min(size, output.length);
    var m = Math.pow(10, n);
    for (var i = 0; i < limit; i++) {
      var r = Math.round(arr[i] * m) / m;
      output[i] = isSame(r, -0) ? 0 : r;
    }
    return output;
  };
}

function testAll(N, fn, array) {
  for (var i = 0; i < N; i++) {
    if (!fn(array[i])) return false;
  }
  return true;
}

var sin = Math.sin;
var cos = Math.cos;
var PI = Math.PI;


function dft(dir, signal, output) {
  if (dir !== 'forward' && dir !== 'inverse') throw Error('Direction must be "forward" or "inverse" but was ' + dir);
  var inverse = dir === 'inverse';
  signal = toComplex(signal);
  output = toComplex(output, signal.real.length);
  process(inverse, signal, output);
  return output;
}

function process(inverse, signal, output) {
  var r = void 0,
      i = void 0,
      theta = void 0;
  var real = signal.real,
      imag = signal.imag;


  var size = output.real.length;
  for (var k = 0; k < size; k++) {
    r = i = 0.0;
    for (var n = 0; n < size; n++) {
      theta = 2 * PI * k * n / size;
      r += real[n] * cos(theta) - imag[n] * sin(theta);
      i -= real[n] * sin(theta) + imag[n] * cos(theta);
    }
    output.real[k] = inverse ? r / size : r;
    output.imag[k] = inverse ? i / size : i;
  }
}

function toComplex(signal, size) {
  if (!signal) {
    if (!size) throw Error('A signal is required');
    return { real: new Float32Array(size), imag: new Float32Array(size) };
  } else if (signal.length) {
    return { real: signal, imag: new Float32Array(signal.length) };
  } else if (!signal.real || !signal.imag || signal.real.length !== signal.imag.length) {
    throw Error('Not valid signal: ' + signal + ' (must be an object { real: Array, imag: Array })');
  } else {
    return signal;
  }
}

function isPow2(v) {
  return !(v & v - 1) && !!v;
}

function fftRadix2(size) {
  var cached = tables(size);
  return {
    forward: function forward(input, output) {
      return process$1(1, cached, input, output);
    },
    inverse: function inverse(input, output) {
      return process$1(-1, cached, input, output);
    }
  };
}

function process$1(dir, tables, input, output) {
  var size = tables.size,
      cosTable = tables.cosTable,
      sinTable = tables.sinTable,
      reverseTable = tables.reverseTable;


  if (!input.real) input = { real: input, imag: new Float32Array(size) };
  var rs = input.real;
  var is = input.imag;
  if (rs.length !== size) throw Error('Real buffer length must be ' + size + ' but was ' + rs.length);
  if (is.length !== size) throw Error('Imag buffer length must be ' + size + ' but was ' + is.length);

  if (!output) output = { real: new Float32Array(size), imag: new Float32Array(size) };
  var _output = output,
      real = _output.real,
      imag = _output.imag;


  var i = void 0;
  for (i = 0; i < size; i++) {
    real[i] = rs[reverseTable[i]];
    imag[i] = dir * is[reverseTable[i]];
  }

  var phaseShiftStepReal = void 0,
      phaseShiftStepImag = void 0,
      currentPhaseShiftReal = void 0,
      currentPhaseShiftImag = void 0;
  var off = void 0,
      tr = void 0,
      ti = void 0,
      tmpReal = void 0;
  var halfSize = 1;
  while (halfSize < size) {
    phaseShiftStepReal = cosTable[halfSize];
    phaseShiftStepImag = sinTable[halfSize];
    currentPhaseShiftReal = 1;
    currentPhaseShiftImag = 0;

    for (var fftStep = 0; fftStep < halfSize; fftStep++) {
      i = fftStep;

      while (i < size) {
        off = i + halfSize;
        tr = currentPhaseShiftReal * real[off] - currentPhaseShiftImag * imag[off];
        ti = currentPhaseShiftReal * imag[off] + currentPhaseShiftImag * real[off];

        real[off] = real[i] - tr;
        imag[off] = imag[i] - ti;
        real[i] += tr;
        imag[i] += ti;

        i += halfSize << 1;
      }

      tmpReal = currentPhaseShiftReal;
      currentPhaseShiftReal = tmpReal * phaseShiftStepReal - currentPhaseShiftImag * phaseShiftStepImag;
      currentPhaseShiftImag = tmpReal * phaseShiftStepImag + currentPhaseShiftImag * phaseShiftStepReal;
    }

    halfSize = halfSize << 1;
  }

  if (dir === -1) {

    for (i = 0; i < size; i++) {
      real[i] /= size;
      imag[i] /= size;
    }
  }

  return output;
}

function tables(size) {
  if (!isPow2(size)) throw Error('Size must be a power of 2, and was: ' + size);
  var reverseTable = new Uint32Array(size);
  var sinTable = new Float64Array(size);
  var cosTable = new Float64Array(size);
  var limit = 1;
  var bit = size >> 1;

  while (limit < size) {
    for (var i = 0; i < limit; i++) {
      reverseTable[i + limit] = reverseTable[i] + bit;
    }
    limit = limit << 1;
    bit = bit >> 1;
  }

  for (var _i = 0; _i < size; _i++) {
    sinTable[_i] = Math.sin(-Math.PI / _i);
    cosTable[_i] = Math.cos(-Math.PI / _i);
  }
  return { size: size, reverseTable: reverseTable, sinTable: sinTable, cosTable: cosTable };
}

var random = Math.random;


function white() {
  var compensate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  return compensate === 1 ? _white : function () {
    return compensate * _white();
  };
}
function _white() {
  return 2 * random() - 1;
}

function pink() {
  var compensate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.11;

  var b0, b1, b2, b3, b4, b5, b6;
  b0 = b1 = b2 = b3 = b4 = b5 = b6 = 0.0;
  return function () {
    var w = _white();
    b0 = 0.99886 * b0 + w * 0.0555179;
    b1 = 0.99332 * b1 + w * 0.0750759;
    b2 = 0.96900 * b2 + w * 0.1538520;
    b3 = 0.86650 * b3 + w * 0.3104856;
    b4 = 0.55000 * b4 + w * 0.5329522;
    b5 = -0.7616 * b5 - w * 0.0168980;
    var out = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
    b6 = w * 0.115926;
    return compensate * out;
  };
}

function brown() {
  var compensate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3.5;

  var out = 0;
  return function () {
    out = (out + 0.02 * _white()) / 1.02;
    return compensate * out;
  };
}

function rotate(src, n) {
  var len = src.length;
  reverse(src, 0, len);
  reverse(src, 0, n);
  reverse(src, n, len);
  return src;
}
function reverse(src, from, to) {
  --from;
  while (++from < --to) {
    var tmp = src[from];
    src[from] = src[to];
    src[to] = tmp;
  }
}

function fftshift(src) {
  var len = src.length;
  return rotate(src, Math.floor(len / 2));
}

function ifftshift(src) {
  var len = src.length;
  return rotate(src, Math.floor((len + 1) / 2));
}

var sqrt = Math.sqrt;
var PI$1 = Math.PI;
var cos$1 = Math.cos;
var sin$1 = Math.sin;
var atan2 = Math.atan2;

var PI2 = 2 * PI$1;

function phmod(ph) {
  return ph < 0 ? PI2 + ph % PI2 : ph % PI2;
}

function zeros$1(l) {
  return new Float64Array(l);
}

function bandWidth(size, sampleRate) {
  return 2 / size * sampleRate / 2;
}

function bandFrequency(index, size, sampleRate) {
  var width = bandWidth(size, sampleRate);
  return width * index + width / 2;
}

function polar(result, output) {
  var real = result.real,
      imag = result.imag;

  var len = real.length;
  if (!output) output = { magnitudes: zeros$1(len), phases: zeros$1(len) };
  var _output = output,
      magnitudes = _output.magnitudes,
      phases = _output.phases;

  var limit = Math.min(len, magnitudes.length);
  var rval = void 0,
      ival = void 0;
  for (var i = 0; i < limit; i++) {
    rval = real[i];
    ival = imag[i];
    if (magnitudes) magnitudes[i] = sqrt(rval * rval + ival * ival);
    if (phases) phases[i] = atan2(ival, rval);
  }
  return output;
}

function rectangular(spectrum, complex) {
  var magnitudes = spectrum.magnitudes,
      phases = spectrum.phases;

  var size = magnitudes.length;
  if (!complex) complex = { real: zeros$1(size), imag: zeros$1(size) };
  var _complex = complex,
      real = _complex.real,
      imag = _complex.imag;

  var limit = Math.min(size, real.length);
  for (var i = 0; i < limit; i++) {
    real[i] = magnitudes[i] * cos$1(phases[i]);
    imag[i] = magnitudes[i] * sin$1(phases[i]);
  }
  return complex;
}

function unwrap(data, output) {
  var size = data.length;
  if (!output) output = zeros$1(size);

  var shift = 0;
  var prev = output[0] = phmod(data[0]);
  for (var i = 1; i < size; i++) {
    var current = phmod(data[i]);
    var diff = current - prev;
    if (diff < -PI$1) shift += PI2;else if (diff > PI$1) shift -= PI2;
    output[i] = current + shift;
    prev = current;
  }
  return output;
}

var PI$2 = Math.PI;
var cos$2 = Math.cos;

var PI2$1 = PI$2 * 2;

var rectangular$1 = function rectangular() {
  return function (n, N) {
    return 1;
  };
};
rectangular$1.rov = 0.5;
var none = rectangular$1;

var hanning = function hanning() {
  return function (n, N) {
    var z = PI2$1 * n / (N - 1);
    return 0.5 * (1 - cos$2(z));
  };
};

var hamming = function hamming() {
  return function (n, N) {
    var z = PI2$1 * n / (N - 1);
    return 0.54 - 0.46 * cos$2(z);
  };
};

var blackman = function blackman(a) {
  return function (n, N) {
    var z = PI2$1 * n / (N - 1);
    return (1 - a) / 2 - 0.5 * cos$2(z) + a * cos$2(2 * z) / 2;
  };
};

var blackmanHarris = function blackmanHarris() {
  return function (n, N) {
    var z = PI2$1 * n / (N - 1);
    return 0.35875 - 0.48829 * cos$2(z) + 0.14128 * cos$2(2 * z) - 0.01168 * cos$2(3 * z);
  };
};

var win = Object.freeze({
	rectangular: rectangular$1,
	none: none,
	hanning: hanning,
	hamming: hamming,
	blackman: blackman,
	blackmanHarris: blackmanHarris
});

var window = win;

exports.window = window;
exports.add = add;
exports.mult = mult;
exports.zeros = zeros;
exports.fill = fill;
exports.concat = concat;
exports.round = round;
exports.testAll = testAll;
exports.dft = dft;
exports.fft = fftRadix2;
exports.white = white;
exports.pink = pink;
exports.brown = brown;
exports.fftshift = fftshift;
exports.ifftshift = ifftshift;
exports.bandWidth = bandWidth;
exports.bandFrequency = bandFrequency;
exports.polar = polar;
exports.rectangular = rectangular;
exports.unwrap = unwrap;

},{}]},{},[1]);

# dsp-kit

> A digital signal processing library in Javascript

[![Build Status](https://travis-ci.org/oramics/dsp-kit.svg?branch=master&style=flat-square)](https://travis-ci.org/oramics/dsp-kit) [![Code Climate](https://codeclimate.com/github/oramics/dsp-kit/badges/gpa.svg?style=flat-square)](https://codeclimate.com/github/oramics/dsp-kit) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard) [![license](https://img.shields.io/npm/l/tonal.svg?style=flat-square)](https://www.npmjs.com/package/tonal)

Since I usually learn by coding, this is the result of my learning on dsp. I'm building while trying to understand the main concepts of dsp targeting audio applications.

Work in progress. Experimental API. Not sure if it will be published, currently is just a playground to understand DSP concepts.

```js
const dsp = require('dsp-kit')
const signal = dsp.fill(1024, (x) => Math.sin(x))
const { magnitudes, phases } = dsp.spectrum(dsp.fft(1024, signal))
// generate a signal adding two sines
const oscillator = dsp.fill(1024, dsp.add(dsp.sine(440), dsp.sine(880)))
```

This is a [multimodule](https://github.com/oramics/dsp-kit/tree/master/packages) repository, each functionallity wrapped in its own package:

- [dsp](https://github.com/oramics/dsp-kit/tree/master/packages/dsp): a _facade_ module that exposes some modules as a coherent package. Probably you just need to install and use that one (unless you are concerned with code size or some esoteric features)
- [array](https://github.com/oramics/dsp-kit/tree/master/packages/buffer): array utilities
- [dft](https://github.com/oramics/dsp-kit/tree/master/packages/dft): discrete fourier implementation (very slow, but easy to understand)
- [elastica](https://github.com/oramics/dsp-kit/tree/master/packages/elastica): timestretch for web audio api (it will be extracted it is own repo when ready).
- [fft](https://github.com/oramics/dsp-kit/tree/master/packages/fft): the default fast fourier algorithm
- [fft-radix2](https://github.com/oramics/dsp-kit/tree/master/packages/fft-radix2): fast forward fourier algorithm using a Cooley-Tukey radix-2 algorithm
- [fft-asm](https://github.com/oramics/dsp-kit/tree/master/packages/fft-asm): a high performance fft implementation based on asm.js (work in progress)
- [fftshift](https://github.com/oramics/dsp-kit/tree/master/packages/fftshift): rotate arrays to perform zero-phasing windowing
- [ola](https://github.com/oramics/dsp-kit/tree/master/packages/ola): overlap and add algorithm for time strething
- [oscillator](https://github.com/oramics/dsp-kit/tree/master/packages/oscillator): work in progress
- [noise](https://github.com/oramics/dsp-kit/tree/master/packages/noise): functions to generate noise
- [signal](https://github.com/oramics/dsp-kit/tree/master/packages/signal): generate and manipulate signals
- [phase-vocoder](https://github.com/oramics/dsp-kit/tree/master/packages/phase-vocoder): phase vocoder algorithm to perform time strething and other signal transformations
- [rfft](https://github.com/oramics/dsp-kit/tree/master/packages/rfft): real split radix FFT (work in progress)
- [spectrum](https://github.com/oramics/dsp-kit/tree/master/packages/spectrum): spectrum manipulation utilities
- [waa](https://github.com/oramics/dsp-kit/tree/master/packages/waa): web audio api interop utilities (wip)
- [window](https://github.com/oramics/dsp-kit/tree/master/packages/window): windowing functions

## Install

-[![npm install dsp-kit](https://nodei.co/npm/dsp-kit.png?mini=true)](https://npmjs.org/package/dsp-kit/)

But currently is not updated to latests version. You can install from this repository:

```
npm i git@github.com:oramics/dsp-kit.git
```

## Documentation

Read the [generated API documentation](https://oramics.github.io/dsp-kit/api/)

## Development

Clone the repo and install dependencies: `npm install` and init lerna: `lerna bootstrap`

Then you can list all the npm tasks with `npm run`:

- __run tests__: `npm test`
- __run benchmarks__: `npm run benchmark`
- __generate documentation__: `npm run docs`

## Credits

Large part of the code is based on the now unmantained [dsp.js](https://github.com/corbanbrook/dsp.js) library by @corbanbrook, that in turn was based on [code samples](http://code.almeros.com/code-examples/delay-firefox-audio-api) by Almer Thie.

Also, this library takes (steal) inspiration from:

- https://github.com/kunstmusik/pink
- https://github.com/colinbdclark/Flocking
- https://github.com/mohayonao/timbre.js/
- https://github.com/MTG/sms-tools
- https://github.com/charlieroberts/genish.js

## References

- https://dsprelated.com in general, and Spectral Audio Signal Processing in particular: https://www.dsprelated.com/freebooks/sasp/
- http://www.dafx.de/
- The awesome [Circles, sines and signals](jackschaedler.github.io/circles-sines-signals/) by Jack Schaedler
- Thanks Xavier for the [Digital signal processing for music applications](https://www.coursera.org/learn/audio-signal-processing) course in coursera.
- The most accessible book I found: [Understanding Digital Signal](https://www.amazon.com/Understanding-Digital-Signal-Processing-3rd/dp/0137027419) by Richard G. Lyons.
- [Spectrum and spectral density estimation by the Discrete Fourier transform (DFT), including a comprehensive list of window functions and some new flat-top windows](https://holometer.fnal.gov/GH_FFT.pdf) by G. Heinzel and others.

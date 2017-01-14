# dsp-kit

> A digital signal processing library in Javascript

Since I usually learn by coding, this is the result of my learning on dsp.

This is largely based in the now abandoned [dsp.js](https://github.com/corbanbrook/dsp.js) code. Work in progress. Experimental API. Use at your own risk.

[![npm install dsp-kit](https://nodei.co/npm/dsp-kit.png?mini=true)](https://npmjs.org/package/dsp-kit/)

```js
const dsp = require('dsp-kit')
const signal = dsp.generate(1024, (x) => Math.sin(x))
const fft = new dsp.FFT(1024)
const spectrum = dsp.spectrum(fft.forward(signal))
spectrum.magnitudes // => the magnitude spectrum of the signal
spectrum.phases // => the phase spectrum of the signal
```

This is a [multimodule](https://github.com/oramics/dsp-kit/tree/master/packages) repository, each functionallity wrapped in its own package:

- [array](https://github.com/oramics/dsp-kit/tree/master/packages/buffer): array utilities
- [delay](https://github.com/oramics/dsp-kit/tree/master/packages/delay): work in progress
- [dft](https://github.com/oramics/dsp-kit/tree/master/packages/dft): discrete fourier implementation (very slow, but easy to understand)
- [dsp](https://github.com/oramics/dsp-kit/tree/master/packages/dsp): a facade module that exposes the functions of the rest of the modules
- [elastica](https://github.com/oramics/dsp-kit/tree/master/packages/elastica): timestretch for web audio api (it will be extracted from this)
- [fft](https://github.com/oramics/dsp-kit/tree/master/packages/fft): fast forward fourier algorithm
- [fft-alt](https://github.com/oramics/dsp-kit/tree/master/packages/fft-alt): alternative fast forward fourier algorithms (see benchmarks)
- [fftshift](https://github.com/oramics/dsp-kit/tree/master/packages/fftshift): rotate arrays to perform zero-phasing windowing
- [ola](https://github.com/oramics/dsp-kit/tree/master/packages/ola): overlap and add algorithm for time strething
- [oscillator](https://github.com/oramics/dsp-kit/tree/master/packages/oscillator): work in progress
- [phase-vocoder](https://github.com/oramics/dsp-kit/tree/master/packages/phase-vocoder): phase vocoder algorithm to perform time strething and other signal transformations
- [rfft](https://github.com/oramics/dsp-kit/tree/master/packages/rfft): real split radix FFT (work in progress)
- [spectrum](https://github.com/oramics/dsp-kit/tree/master/packages/spectrum): spectrum manipulation utilities
- [waa](https://github.com/oramics/dsp-kit/tree/master/packages/waa): web audio api interop utilities (wip)
- [window](https://github.com/oramics/dsp-kit/tree/master/packages/window): windowing functions

## Documentation

Read the [generated API documentation](https://github.com/oramics/dsp-kit/blob/master/docs/API.md)

## Development

Clone the repo and install dependencies: `npm install` and init lerna: `lerna bootstrap`

Then you can list all the npm tasks with `npm run`:

- __run tests__: `npm test`
- __run benchmarks__: `npm run benchmarks`
- __generate documentation__: `npm run docs`

## Credits

Lot of the code is based on the now unmantained [dsp.js]() library by @corbanbrook, that in turn was based on [code samples](http://code.almeros.com/code-examples/delay-firefox-audio-api) by Almer Thie.

Also, this library takes (steal) inspiration from:

- https://github.com/kunstmusik/pink
- https://github.com/colinbdclark/Flocking
- https://github.com/mohayonao/timbre.js/

## References

- https://dsprelated.com in general, and Spectral Audio Signal Processing in particular: https://www.dsprelated.com/freebooks/sasp/
- http://www.dafx.de/
- [Circles, sines and signals](jackschaedler.github.io/circles-sines-signals/) by Jack Schaedler
- [Digital signal processing for music applications](https://www.coursera.org/learn/audio-signal-processing) course in coursera.
- [Understanding Digital Signal](https://www.amazon.com/Understanding-Digital-Signal-Processing-3rd/dp/0137027419) by Richard G. Lyons.
- [Spectrum and spectral density estimation by the Discrete Fourier transform (DFT), including a comprehensive list of window functions and some new flat-top windows](https://holometer.fnal.gov/GH_FFT.pdf) by G. Heinzel and others.

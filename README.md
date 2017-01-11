# dsp-kit

> A digital signal processing library in Javascript

Since I usually learn by coding, this is the result of my learning on dsp.

This is largely based in the now abandoned [dsp.js](https://github.com/corbanbrook/dsp.js) code. Work in progress. Experimental API. Use at your own risk.

This is a [multimodule](https://github.com/oramics/dsp-kit/tree/master/packages) repository.

```js
const dsp = require('dsp-kit')
const signal = dsp.generate(1024, (x) => Math.sin(x))
const fft = new dsp.FFT(1024)
const spectrum = dsp.spectrum(fft.forward(signal))
spectrum.magnitudes // => the magnitude spectrum of the signal
spectrum.phases // => the phase spectrum of the signal
```

## Documentation

Read the [generated API documentation](https://github.com/oramics/dsp-kit/blob/master/docs/README.md)

## Development

Clone the repo and install dependencies: `npm install` and init lerna: `lerna bootstrap`

- __run tests__: `npm test`
- __run benchmarks__: `npm run benchmarks`
- __generate documentation__: `npm run docs`

## References

- http://www.dafx.de/
- [Circles, sines and signals](jackschaedler.github.io/circles-sines-signals/) by Jack Schaedler
- [Digital signal processing for music applications](https://www.coursera.org/learn/audio-signal-processing) course in coursera.
- [Understanding Digital Signal](https://www.amazon.com/Understanding-Digital-Signal-Processing-3rd/dp/0137027419) by Richard G. Lyons.
- [Spectrum and spectral density estimation by the Discrete Fourier transform (DFT), including a comprehensive list of window functions and some new flat-top windows](https://holometer.fnal.gov/GH_FFT.pdf) by G. Heinzel and others.

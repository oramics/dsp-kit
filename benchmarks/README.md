# Benchmarks

## FFT forward

```
17/01/11 - legacy 31.6 / dft 28.1 / dft+output 36.3
```

```
FFT forward benchmark
dspjs FFT x 34,798 ops/sec ±0.73% (88 runs sampled)
dsp-kit FFT x 29,649 ops/sec ±4.22% (79 runs sampled)
dsp-kit FFT reuse buffer 64 bits x 39,347 ops/sec ±0.57% (88 runs sampled)
dsp-kit FFT with spectrum x 17,242 ops/sec ±1.11% (88 runs sampled)
fft FFT x 1,477 ops/sec ±0.83% (88 runs sampled)
Fastest is  [ 'dsp-kit FFT reuse buffer 64 bits' ]
```

```
FFT forward benchmark
dspjs FFT x 32,837 ops/sec ±0.78% (86 runs sampled)
dsp-kit FFT x 27,605 ops/sec ±3.67% (75 runs sampled)
dsp-kit FFT reuse buffer 64 bits x 36,377 ops/sec ±0.82% (87 runs sampled)
dsp-kit FFT with spectrum x 10,519 ops/sec ±0.87% (82 runs sampled)
fft FFT x 1,506 ops/sec ±1.03% (87 runs sampled)
fft inplace x 26,460 ops/sec ±0.82% (85 runs sampled)
rfft forward x 51,256 ops/sec ±0.73% (86 runs sampled)
Fastest is  [ 'rfft forward' ]
```

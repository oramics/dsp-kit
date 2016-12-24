# The Fourier Transform

Understanding the discrete fourier transform by coding it into javascript.

> The discrete Fourier transform (DFT) is one of the two most common, and powerful, procedures encountered in the field of digital signal processing. (Digital filtering is the other.) The DFT enables us to analyze, manipulate, and synthesize signals in ways not possible with continuous (analog) signal processing. Even though it's now used in almost every field of engineering, we'll see applications for DFT continue to flourish as its utility becomes more widely understood. Because of this, a solid understanding of the DFT is mandatory for anyone working in the field of digital signal processing. [1]

The Fourier transform is an algorithm to find cyclic patterns. The mathematical version is quite ugly:

![Fourier Transform Equation](https://wikimedia.org/api/rest_v1/media/math/render/svg/b52e5fea739005f88aa2dd14716fef886603a1b5)

We won't use that, we'll use a version of that one, the _discrete_ fourier transform that allow to apply the transformation to _discrete_ signals. We'll know soon what a discrete signal is but before I want to emphasize a property of the fourier transform: it's inversible. It means that if we transform something with the fourier transform, we can use another mathematical procedure (the _inverse_ fourier transform) to get that something back.

## 2. Signal and correlation

Signals in the physical world are, acording to wikipedia, "any quantity exhibiting variation in time or variation in space". Tipical examples are radio, telephone, radar, television. For example, an electric voltage is a tipical representation (a signal) of a sound used in electric devices like electric guitars or amplifiers.

Since we are working with computers, we are going to talk about _digital_ signals, basically a succession of numbers. In javascript, and for our educational purposes, a simple array will do the job: `const signal = [1, 0.5, -2, -100, 0]`.

Computers usually have one or more "analog to digital" signal converters, like the one that takes the sound from the microphone and converts it into a digital signal that can be saved into a file.

The _correlation_ is a measure of how similar two signals are. If the _absolute_ correlation is high, then the signals are similar, and if the correlation is near zero the signals are not similar.

Calculate the correlation between two signals is surprisingly easy:

![correlation](images/correlation.png)

It's an operation called _dot product_ that basically multiply one by one the elements of two signals. Here's an [awesome explanation of dot product](http://jackschaedler.github.io/circles-sines-signals/dotproduct.html) [and correlation](http://jackschaedler.github.io/circles-sines-signals/dotproduct2.html)

## 3. Discrete fourier transform

Correlation is very important to the discrete fourier transform because what the transform does is basically _find the correlation (the similarity) between a collection of predefined signals and your signal_.

Althought the typical equation for the discrete fourier transform is this one:

We'll deal with an equivalent version:

Here we should see two things,

1. It deals with [comples numbers! aaargg](https://betterexplained.com/articles/a-visual-intuitive-guide-to-imaginary-numbers/)
2. The real part (from the left) is a _correlation_ between your signal and a cosine signal, and the imaginary parte (the right) is a _correlation_ between your signal and a





## 4. Bibliography

- `[1]`: [Understanding Digital Signal](https://www.amazon.com/Understanding-Digital-Signal-Processing-3rd/dp/0137027419) by Richard G. Lyons.

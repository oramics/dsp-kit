# Dynamic Stochastic Synthesis (1977): Method

- https://github.com/abbernie/gendy
- http://www.sergioluque.com/texts/Luque-Stochastic_Synthesis-Origins_and_Extensions.pdf

1. Select the number of breakpoints for the waveform. For example: 3
2. Select the waveform’s minimum and maximum frequencies and convert them to duration in number of samples. For example: 368-735 Hertz = 120-60 samples
3. Divide the minimum and maximum number of samples by the number of breakpoints:
 - 60/3 = 20
 - 120/3 = 40
(These values are the barriers for the duration random walk of each breakpoint)
4. For the continual generation of steps for all the duration random walks: select a probability distribution, its parameters and the ± number that will be the minimum and maximum size for these steps.
5. An initial duration is given to each breakpoint: values taken from stochastic or
trigonometric functions, the minimum or the maximum duration, etc.
6. A maximum amplitude is selected and this ± value is the barrier for the amplitude
random walk of each breakpoint.
7. For the continual generation of steps for all the amplitude random walks: select a
probability distribution, its parameters and the ± number that will be the minimum
and maximum size for these steps.
8. An initial amplitude is given to the each breakpoint: values taken from stochastic or
trigonometric functions, zeroes, etc.
9. Breakpoints are linked by linear interpolation. At each repetition, the last breakpoint
of the current waveform is connected with the first breakpoint of the next variation
of the waveform.

This technique is described in the chapter “Dynamic Stochastic Synthesis” of Formalized
Music (Xenakis 1992, pp. 289-293) and is often mistaken as the explanation for the dynamic stochastic synthesis algorithm implemented in the beginning of the 1990

import json
import numpy as np

def write(name, data):
    with open(name, 'w') as outfile:
        json.dump(data.tolist(), outfile)

with open('noise4096.json') as json_data:
    d = json.load(json_data)
    arr = np.fromiter(d, np.float32)
    fft = np.fft.fft(arr)

    with open('noise4096fft-real.json', 'w') as outfile:
        json.dump(fft.real.tolist(), outfile)
    with open('noise4096fft-imag.json', 'w') as outfile:
        json.dump(fft.imag.tolist(), outfile)
    with open('noise4096fft-abs.json', 'w') as outfile:
        json.dump(abs(fft).tolist(), outfile)
    with open('noise4096fft-angle.json', 'w') as outfile:
        json.dump(np.angle(fft).tolist(), outfile)
    with open('noise4096fft-unwrap.json', 'w') as outfile:
        json.dump(np.unwrap(np.angle(fft)).tolist(), outfile)
    write('noise4096ifft-real.json', np.fft.ifft(fft).real)
    write('noise4096ifft-imag.json', np.fft.ifft(fft).imag)

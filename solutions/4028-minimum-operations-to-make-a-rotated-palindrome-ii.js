/**
 * Minimum Operations to Make a Rotated Palindrome II
 * Intuition: Same pairing as Rotated Palindrome I, but n can be 5e4 so we cannot try every rotation with two pointers. After k left rotations every palindrome pair shares one original-index sum, so all rotations reduce to n convolution scores.
 * Approach: 1. Map each letter to Z/26Z. 2. For frequencies t = 0..13, FFT-convolve the sequence with its reverse conjugate. 3. Weight by the DFT of min(d, 26-d). 4. For each rotation k, add k to the pairing cost of c = (2k+n-1) mod n and take the minimum.
 * Dry Run: s = "abc". One optimal plan is rotate to "bca" then increment 'a' to 'b' → "bcb", cost 2.
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var minOperations = function (s) {
  const n = s.length;

  let size = 1;
  while (size < 2 * n) {
    size <<= 1;
  }

  const letterValues = [];
  for (const character of s) {
    letterValues.push(character.charCodeAt(0) - 97);
  }

  const harmonicCost = Array(26).fill(0);
  for (let frequency = 0; frequency < 26; frequency++) {
    for (let offset = 0; offset < 26; offset++) {
      const arc = Math.min(offset, 26 - offset);
      harmonicCost[frequency] +=
        arc * Math.cos((-2 * Math.PI * frequency * offset) / 26);
    }
  }

  const pairCostByIndexSum = Array(n).fill(0);
  const real = Array(size).fill(0);
  const imag = Array(size).fill(0);
  const convReal = Array(size).fill(0);
  const convImag = Array(size).fill(0);

  var fft = function (realPart, imagPart, invert) {
    const length = realPart.length;

    for (let i = 1, j = 0; i < length; i++) {
      let bit = length >> 1;
      while (j & bit) {
        j ^= bit;
        bit >>= 1;
      }
      j ^= bit;

      if (i < j) {
        [realPart[i], realPart[j]] = [realPart[j], realPart[i]];
        [imagPart[i], imagPart[j]] = [imagPart[j], imagPart[i]];
      }
    }

    for (let len = 2; len <= length; len <<= 1) {
      let angle = (2 * Math.PI) / len;
      if (invert) {
        angle = -angle;
      }

      const rootReal = Math.cos(angle);
      const rootImag = Math.sin(angle);
      const half = len >> 1;

      for (let i = 0; i < length; i += len) {
        let twiddleReal = 1;
        let twiddleImag = 0;

        for (let j = 0; j < half; j++) {
          const left = i + j;
          const right = left + half;

          const productReal =
            realPart[right] * twiddleReal - imagPart[right] * twiddleImag;
          const productImag =
            realPart[right] * twiddleImag + imagPart[right] * twiddleReal;

          const leftReal = realPart[left];
          const leftImag = imagPart[left];

          realPart[left] = leftReal + productReal;
          imagPart[left] = leftImag + productImag;
          realPart[right] = leftReal - productReal;
          imagPart[right] = leftImag - productImag;

          const nextReal = twiddleReal * rootReal - twiddleImag * rootImag;
          const nextImag = twiddleReal * rootImag + twiddleImag * rootReal;
          twiddleReal = nextReal;
          twiddleImag = nextImag;
        }
      }
    }

    if (invert) {
      for (let i = 0; i < length; i++) {
        realPart[i] /= length;
        imagPart[i] /= length;
      }
    }
  };

  for (let frequency = 0; frequency < 14; frequency++) {
    const theta = (2 * Math.PI * frequency) / 26;

    for (let i = 0; i < n; i++) {
      const angle = theta * letterValues[i];
      real[i] = Math.cos(angle);
      imag[i] = Math.sin(angle);
    }

    for (let i = n; i < size; i++) {
      real[i] = 0;
      imag[i] = 0;
    }

    fft(real, imag, false);

    for (let i = 0; i < size; i++) {
      const conjugateIndex = (size - i) & (size - 1);
      const aReal = real[i];
      const aImag = imag[i];
      const bReal = real[conjugateIndex];
      const bImag = -imag[conjugateIndex];

      convReal[i] = aReal * bReal - aImag * bImag;
      convImag[i] = -(aReal * bImag + aImag * bReal);
    }

    fft(convReal, convImag, false);

    const multiplicity = frequency === 0 || frequency === 13 ? 1 : 2;
    const scale = (multiplicity * harmonicCost[frequency]) / size;

    for (let indexSum = 0; indexSum < n; indexSum++) {
      pairCostByIndexSum[indexSum] +=
        scale * (convReal[indexSum] + convReal[indexSum + n]);
    }
  }

  let minimumOperations = Number.MAX_SAFE_INTEGER;

  for (let rotations = 0; rotations < n; rotations++) {
    const indexSum = (2 * rotations + n - 1) % n;
    const incrementCost = Math.round(pairCostByIndexSum[indexSum] / 52);
    minimumOperations = Math.min(minimumOperations, rotations + incrementCost);
  }

  return minimumOperations;
};

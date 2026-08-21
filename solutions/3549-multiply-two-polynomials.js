/**
 * Multiply Two Polynomials
 * Intuition: Convolution of coefficient arrays is polynomial multiplication and is computed with FFT in O(n log n).
 * Approach: 1. Pad both polys to the next power of two ≥ n1+n2-1. 2. FFT both, pointwise multiply, inverse FFT. 3. Round real parts to integer coefficients.
 * Dry Run: poly1 = [1, 2], poly2 = [3, 4] → 1*3 + (2*3+1*4)x + 2*4 x^2 = [3, 10, 8].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var multiply = function (poly1, poly2) {
  const n1 = poly1.length;
  const n2 = poly2.length;
  const n = n1 + n2 - 1;
  const bitLength = (x) => 32 - Math.clz32(x);
  const sz = 1 << bitLength(n - 1 || 1);

  const fft = (a, inverse) => {
    const len = a.length;
    for (let i = 1, j = 0; i < len; i++) {
      let bit = len >> 1;
      for (; j & bit; bit >>= 1) j ^= bit;
      j ^= bit;
      if (i < j) {
        const tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
      }
    }
    for (let length = 2; length <= len; length *= 2) {
      const angle = ((2 * Math.PI) / length) * (inverse ? -1 : 1);
      const wLen = [Math.cos(angle), Math.sin(angle)];
      for (let i = 0; i < len; i += length) {
        let w = [1, 0];
        for (let j = 0; j < length / 2; j++) {
          const u = a[i + j];
          const vReal =
            a[i + j + length / 2][0] * w[0] - a[i + j + length / 2][1] * w[1];
          const vImag =
            a[i + j + length / 2][0] * w[1] + a[i + j + length / 2][1] * w[0];
          a[i + j] = [u[0] + vReal, u[1] + vImag];
          a[i + j + length / 2] = [u[0] - vReal, u[1] - vImag];
          const nw0 = w[0] * wLen[0] - w[1] * wLen[1];
          const nw1 = w[0] * wLen[1] + w[1] * wLen[0];
          w = [nw0, nw1];
        }
      }
    }
    if (inverse) {
      for (let i = 0; i < len; i++) {
        a[i][0] /= len;
        a[i][1] /= len;
      }
    }
  };

  const a = Array.from({ length: sz }, () => [0, 0]);
  const b = Array.from({ length: sz }, () => [0, 0]);
  for (let i = 0; i < n1; i++) a[i] = [poly1[i], 0];
  for (let i = 0; i < n2; i++) b[i] = [poly2[i], 0];
  fft(a, false);
  fft(b, false);
  for (let i = 0; i < sz; i++) {
    const r = a[i][0] * b[i][0] - a[i][1] * b[i][1];
    const im = a[i][0] * b[i][1] + a[i][1] * b[i][0];
    a[i] = [r, im];
  }
  fft(a, true);
  const answer = new Array(n);
  for (let i = 0; i < n; i++) {
    answer[i] = Math.round(a[i][0]);
  }
  return answer;
};

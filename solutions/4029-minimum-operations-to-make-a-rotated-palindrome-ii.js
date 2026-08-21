/**
 * Minimum Operations to Make a Rotated Palindrome II
 * Intuition: This problem is the same as "Minimum Operations to Make a Rotated Palindrome I", but n can be as large as 5  *  10^4, so enumerating rotations and pairing characters naively is too slow.
 * Approach: This problem is the same as "Minimum Operations to Make a Rotated Palindrome I", but n can be as large as 5  *  10^4, so enumerating rotations and pairing characters naively is too slow. After k left rotations, index i in the new string corresponds to index (i+k) bmod n in the original string. The sum of original indices of a palindrome pair (i, n-1-i) is 2k+n-1, which is constant for all pairs. Thus, after k rotations, every pair has original-index sum congruent to c = (2k+n-1) bmod n. The increment cost of two letters is the shorter arc min(d, 26-d) on the letter ring. Viewing the cost as a function on mathbb{Z}/26mathbb{Z} and expanding it by the discrete Fourier transform, we map each character x to the phase e^{2pi i t x / 26} for each frequency t, then compute a circular convolution of the sequence. This yields the total pairing cost for every index-sum c at once. Since the cost function is even, we only need frequencies t = 0, ldots, 13 (the rest follow by conjugate symmetry). Each pair is counted twice, and we also divide by 26 from the DFT, so dividing the convolution by 52 and rounding gives the increment cost.
 * Dry Run: Input: s = "abc". Output: 2.
 * Time Complexity: O(n * logn)
 * Space Complexity: O(n)
 */
var minOperations = function (s) {
  const n = s.length;

  let size = 1;
  while (size < 2 * n) {
    size <<= 1;
  }

  const nums = [];
  for (const c of s) {
    nums.push(c.charCodeAt(0) - 97);
  }

  const cost = Array(26).fill(0);

  for (let t = 0; t < 26; t++) {
    for (let z = 0; z < 26; z++) {
      const d = Math.min(z, 26 - z);
      cost[t] += d * Math.cos((-2 * Math.PI * t * z) / 26);
    }
  }

  const dp = Array(n).fill(0);

  const re = Array(size).fill(0);
  const im = Array(size).fill(0);
  const bre = Array(size).fill(0);
  const bim = Array(size).fill(0);

  var fft = function (re, im, inv) {
    const n = re.length;

    for (let i = 1, j = 0; i < n; i++) {
      let bit = n >> 1;

      while (j & bit) {
        j ^= bit;
        bit >>= 1;
      }

      j ^= bit;

      if (i < j) {
        [re[i], re[j]] = [re[j], re[i]];
        [im[i], im[j]] = [im[j], im[i]];
      }
    }

    for (let len = 2; len <= n; len <<= 1) {
      let ang = (2 * Math.PI) / len;

      if (inv) {
        ang = -ang;
      }

      const wr = Math.cos(ang);
      const wi = Math.sin(ang);
      const half = len >> 1;

      for (let i = 0; i < n; i += len) {
        let cr = 1;
        let ci = 0;

        for (let j = 0; j < half; j++) {
          const x = i + j;
          const y = x + half;

          const tr = re[y] * cr - im[y] * ci;
          const ti = re[y] * ci + im[y] * cr;

          const ur = re[x];
          const ui = im[x];

          re[x] = ur + tr;
          im[x] = ui + ti;

          re[y] = ur - tr;
          im[y] = ui - ti;

          const nr = cr * wr - ci * wi;
          const ni = cr * wi + ci * wr;

          cr = nr;
          ci = ni;
        }
      }
    }

    if (inv) {
      for (let i = 0; i < n; i++) {
        re[i] /= n;
        im[i] /= n;
      }
    }
  };

  for (let t = 0; t < 14; t++) {
    const theta = (2 * Math.PI * t) / 26;

    for (let i = 0; i < n; i++) {
      const angle = theta * nums[i];

      re[i] = Math.cos(angle);
      im[i] = Math.sin(angle);
    }

    for (let i = n; i < size; i++) {
      re[i] = 0;
      im[i] = 0;
    }

    fft(re, im, false);

    for (let i = 0; i < size; i++) {
      const j = (size - i) & (size - 1);

      const ar = re[i];
      const ai = im[i];

      const br = re[j];
      const bi = -im[j];

      bre[i] = ar * br - ai * bi;
      bim[i] = -(ar * bi + ai * br);
    }

    fft(bre, bim, false);

    const mult = t === 0 || t === 13 ? 1 : 2;
    const factor = (mult * cost[t]) / size;

    for (let c = 0; c < n; c++) {
      dp[c] += factor * (bre[c] + bre[c + n]);
    }
  }

  let ans = Number.MAX_SAFE_INTEGER;

  for (let k = 0; k < n; k++) {
    const c = (2 * k + n - 1) % n;
    const d = Math.round(dp[c] / 52);

    ans = Math.min(ans, k + d);
  }

  return ans;
};

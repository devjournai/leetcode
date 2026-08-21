/**
 * String Transformation
 * Intuition: One operation is a rotation of s. Count how many rotations equal t (good states), then the graph is a complete graph on n rotations. Track good vs bad with a 2x2 matrix raised to k.
 * Approach: 1. KMP-search t in s+s without the last char to count good rotation offsets. 2. Build the transition matrix: from good, G-1 other goods and B bads; from bad, G goods and B-1 bads. 3. Matrix-exponentiate k steps from whether s already equals t.
 * Dry Run: s = "abcd", t = "cdab", k = 2. One good rotation (offset 2). After 2 steps the matrix yields 2 ways.
 * Time Complexity: O(n + log k)
 * Space Complexity: O(n)
 */

var numberOfWays = function (s, t, k) {
  const MOD = 1000000007n;
  const n = s.length;

  const text = s + s.slice(0, n - 1);

  const buildLPS = (pat) => {
    const lps = new Array(pat.length).fill(0);

    for (let i = 1, j = 0; i < pat.length;) {
      if (pat[i] === pat[j]) {
        lps[i++] = ++j;
      } else if (j > 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }

    return lps;
  };

  const lps = buildLPS(t);

  let good = 0;

  for (let i = 0, j = 0; i < text.length;) {
    if (text[i] === t[j]) {
      i++;
      j++;

      if (j === t.length) {
        good++;
        j = lps[j - 1];
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }

  const bad = n - good;

  const startGood = s === t ? 1n : 0n;
  const startBad = s === t ? 0n : 1n;

  const mul = (A, B) => {
    return [
      [
        (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % MOD,
        (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % MOD,
      ],
      [
        (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % MOD,
        (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % MOD,
      ],
    ];
  };

  let mat = [
    [BigInt(good - 1), BigInt(good)],
    [BigInt(bad), BigInt(bad - 1)],
  ];

  let res = [
    [1n, 0n],
    [0n, 1n],
  ];

  let exp = BigInt(k);

  while (exp > 0n) {
    if (exp & 1n) {
      res = mul(res, mat);
    }

    mat = mul(mat, mat);
    exp >>= 1n;
  }

  const answer = (res[0][0] * startGood + res[0][1] * startBad) % MOD;

  return Number(answer);
};

/**
 * Number of ZigZag Arrays III
 * Intuition: Same recurrence as ZigZag I/II, but m = r-l+1 can be 1e9 while n<=200, so the answer is a polynomial in m of degree n. Interpolate it modulo 1e9+7.
 * Approach: 1. Evaluate zigZag DP at m = 1..n+2. 2. Lagrange interpolate at the true m. 3. Return modulo 1e9+7.
 * Dry Run: Input: n = 3, l = 4, r = 5. Output: 2.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */
var zigZagArrays = function (n, l, r) {
  const MOD = 1000000007n;
  const mReal = BigInt(r - l + 1);
  const evalM = (m) => {
    const D = Number(m);
    if (D <= 1) return 0n;
    let inc = Array(D).fill(0n);
    let dec = Array(D).fill(0n);
    for (let v = 0; v < D; v++) {
      inc[v] = BigInt(v);
      dec[v] = BigInt(D - 1 - v);
    }
    for (let i = 3; i <= n; i++) {
      const psInc = Array(D).fill(0n);
      const psDec = Array(D).fill(0n);
      let s0 = 0n,
        s1 = 0n;
      for (let v = 0; v < D; v++) {
        s0 = (s0 + inc[v]) % MOD;
        s1 = (s1 + dec[v]) % MOD;
        psInc[v] = s0;
        psDec[v] = s1;
      }
      const nInc = Array(D).fill(0n);
      const nDec = Array(D).fill(0n);
      for (let v = 0; v < D; v++) {
        if (v > 0) nInc[v] = psDec[v - 1];
        if (v < D - 1) nDec[v] = (psInc[D - 1] - psInc[v] + MOD) % MOD;
      }
      inc = nInc;
      dec = nDec;
    }
    let tot = 0n;
    for (let v = 0; v < D; v++) tot = (tot + inc[v] + dec[v]) % MOD;
    return tot;
  };
  const deg = n + 2;
  const xs = [];
  const ys = [];
  for (let i = 1; i <= deg + 1; i++) {
    xs.push(BigInt(i));
    ys.push(evalM(BigInt(i)));
  }
  const modPow = (a, e) => {
    let b = a % MOD,
      r = 1n,
      k = e;
    while (k > 0n) {
      if (k & 1n) r = (r * b) % MOD;
      b = (b * b) % MOD;
      k >>= 1n;
    }
    return r;
  };
  const inv = (a) => modPow(((a % MOD) + MOD) % MOD, MOD - 2n);
  let ans = 0n;
  for (let i = 0; i < xs.length; i++) {
    let num = 1n,
      den = 1n;
    for (let j = 0; j < xs.length; j++) {
      if (i === j) continue;
      num = (num * (mReal - xs[j])) % MOD;
      den = (den * (xs[i] - xs[j])) % MOD;
    }
    ans = (ans + ((ys[i] * num) % MOD) * inv(den)) % MOD;
  }
  return Number((ans + MOD) % MOD);
};

/**
 * Manhattan Distances of All Arrangements of Pieces
 * Intuition: Every pair of cells contributes |r1-r2| + |c1-c2|. Sum row distances and column distances separately, then multiply by the ways to place the remaining k-2 pieces on the leftover cells.
 * Approach: 1. Row contribution is n^2 * (m^3 - m) / 6. 2. Column contribution is m^2 * (n^3 - n) / 6. 3. Multiply by C(m*n-2, k-2) modulo 1e9+7 using Fermat inverses.
 * Dry Run: m = 2, n = 2, k = 2. Four cells, C(2,0)=1. Row contrib = 4*(8-2)/6 = 4, col contrib = 4. Total = 8, matching all 2-piece arrangements.
 * Time Complexity: O(min(K, M*N) * log MOD)
 * Space Complexity: O(1)
 */

var distanceSum = function (rowCount, columnCount, pieceCount) {
  const MOD = 1000000007n;
  const m = BigInt(rowCount);
  const n = BigInt(columnCount);
  const k = BigInt(pieceCount);

  const modPow = (base, exponent) => {
    let result = 1n;
    let current = base % MOD;
    let power = exponent;
    while (power > 0n) {
      if (power % 2n === 1n) {
        result = (result * current) % MOD;
      }
      current = (current * current) % MOD;
      power /= 2n;
    }
    return result;
  };

  const nCk = (nValue, kValue) => {
    if (kValue < 0n || kValue > nValue) {
      return 0n;
    }
    let choose = kValue < nValue - kValue ? kValue : nValue - kValue;
    let result = 1n;
    for (let index = 1n; index <= choose; index++) {
      result = (result * (nValue - index + 1n)) % MOD;
      result = (result * modPow(index, MOD - 2n)) % MOD;
    }
    return result;
  };

  const rowContribution = ((n * n * (m * m * m - m)) / 6n) % MOD;
  const columnContribution = ((m * m * (n * n * n - n)) / 6n) % MOD;
  const pairCount = nCk(m * n - 2n, k - 2n);
  return Number(
    (((rowContribution + columnContribution) % MOD) * pairCount) % MOD
  );
};

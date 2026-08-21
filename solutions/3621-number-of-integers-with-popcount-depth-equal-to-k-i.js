/**
 * Number of Integers with Popcount-Depth Equal to K I
 * Intuition: Depth 0 is only 1; depth 1 is powers of two. For k≥2, x has depth k iff popcount(x)=c and c itself has depth k-1. Count ≤n numbers with exactly those c bits via binomial digits.
 * Approach: 1. Precompute C(i,j) and depths of 0..60. 2. k=0 → 1; k=1 → floor(log2 n). 3. For each c with D[c]==k-1, add how many integers in [1,n] have popcount c.
 * Dry Run: n = 7, k = 2. Depths of bit-counts: c=2 has depth 1, numbers 3,5,6 → 3.
 * Time Complexity: O((log n)^2)
 * Space Complexity: O((log n)^2)
 */
var popcountDepth = function (n, k) {
  const maxBits = 61;
  const combinations = Array.from({ length: maxBits + 1 }, () =>
    Array(maxBits + 1).fill(0)
  );
  for (let bits = 0; bits <= maxBits; bits++) {
    combinations[bits][0] = 1;
    for (let choose = 1; choose <= bits; choose++) {
      combinations[bits][choose] =
        combinations[bits - 1][choose] + combinations[bits - 1][choose - 1];
    }
  }

  const popcount = (value) => {
    let count = 0;
    while (value) {
      value &= value - 1;
      count++;
    }
    return count;
  };

  const depth = Array(maxBits + 1).fill(0);
  for (let value = 2; value <= maxBits; value++) {
    depth[value] = depth[popcount(value)] + 1;
  }

  const countWithBits = (targetBits) => {
    let total = 0;
    let usedOnes = 0;
    const asBig = BigInt(n);
    const bitLength = asBig.toString(2).length;

    for (let bit = bitLength - 1; bit >= 0; bit--) {
      if ((asBig & (1n << BigInt(bit))) === 0n) {
        continue;
      }
      const remaining = targetBits - usedOnes;
      if (remaining >= 0 && remaining <= bit) {
        total += combinations[bit][remaining];
      }
      usedOnes++;
    }
    if (usedOnes === targetBits) {
      total++;
    }
    return total;
  };

  if (k === 0) {
    return 1;
  }
  if (k === 1) {
    return BigInt(n).toString(2).length - 1;
  }

  const bitLength = BigInt(n).toString(2).length;
  let answer = 0;
  for (let bits = 2; bits <= bitLength; bits++) {
    if (depth[bits] === k - 1) {
      answer += countWithBits(bits);
    }
  }
  return answer;
};

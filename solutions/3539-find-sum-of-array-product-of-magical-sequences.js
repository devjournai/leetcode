/**
 * Find Sum of Array Product of Magical Sequences
 * Intuition: Choose how many times each nums[i] appears in a multiset of size m; the OR-popcount of their 2^i contributions (with carry) must be k. Combine with binomials and modular powers.
 * Approach: 1. DP on remaining picks m, remaining bits k, index i, and carry. 2. For count=0..m, add comb(m,count)*nums[i]^count and recurse with newCarry. 3. Base: m==0 succeeds iff k equals popcount(carry).
 * Dry Run: m=1, k=1, nums=[1,1]. Two sequences of one index, each product 1, sum 2.
 * Time Complexity: O(M^3 * K * N)
 * Space Complexity: O(M^2 * K * N)
 */
var magicalSum = function (m, k, nums) {
  const MOD = 1000000007n;

  const getComb = (n, kk) => {
    const comb = Array.from({ length: n + 1 }, () =>
      new Array(kk + 1).fill(0n)
    );
    for (let i = 0; i <= n; i++) comb[i][0] = 1n;
    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= kk; j++) {
        comb[i][j] = (comb[i - 1][j] + comb[i - 1][j - 1]) % MOD;
      }
    }
    return comb;
  };

  const modPow = (x, n) => {
    if (n === 0n) return 1n;
    if (n % 2n === 1n) return (x * modPow(x % MOD, n - 1n)) % MOD;
    return modPow((x * x) % MOD, n / 2n);
  };

  const popcount = (x) => {
    let c = 0;
    let v = x;
    while (v) {
      c += v & 1;
      v >>= 1;
    }
    return c;
  };

  const comb = getComb(m, m);
  const memo = new Map();

  const dp = (remainM, remainK, i, carry) => {
    if (remainM < 0 || remainK < 0 || remainM + popcount(carry) < remainK)
      return 0n;
    if (remainM === 0) return remainK === popcount(carry) ? 1n : 0n;
    if (i === nums.length) return 0n;
    const key = `${remainM},${remainK},${i},${carry}`;
    if (memo.has(key)) return memo.get(key);
    let res = 0n;
    for (let count = 0; count <= remainM; count++) {
      const contribution =
        (comb[remainM][count] * modPow(BigInt(nums[i]), BigInt(count))) % MOD;
      const newCarry = carry + count;
      res =
        (res +
          dp(
            remainM - count,
            remainK - (newCarry % 2),
            i + 1,
            Math.floor(newCarry / 2)
          ) *
            contribution) %
        MOD;
    }
    memo.set(key, res);
    return res;
  };

  return Number(dp(m, k, 0, 0));
};

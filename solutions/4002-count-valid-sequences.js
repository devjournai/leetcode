/**
 * Count Valid Sequences
 * Intuition: The number of ordered ways to write n as a sum of k positive integers is binom{n-1}{k-1}. An even product means "at least one even number"; the complement is "all odd".
 * Approach: The number of ordered ways to write n as a sum of k positive integers is binom{n-1}{k-1}. An even product means "at least one even number"; the complement is "all odd". Therefore the answer is: $ binom{n-1}{k-1} - (number of all-odd sequences) $
 * Dry Run: Input: n = 5, k = 3. Output: 3.
 * Time Complexity: O(N+logM)
 * Space Complexity: O(N)
 */
const MX = 500001;
const MOD = 1000000007n;

const f = new Array(MX).fill(1n);
const g = new Array(MX).fill(1n);

var pow = function (a, b) {
  let res = 1n;
  while (b > 0n) {
    if (b & 1n) {
      res = (res * a) % MOD;
    }
    a = (a * a) % MOD;
    b >>= 1n;
  }
  return res;
};
for (let i = 1; i < MX; i++) {
  f[i] = (f[i - 1] * BigInt(i)) % MOD;
  g[i] = pow(f[i], MOD - 2n);
}

var comb = function (n, k) {
  return (((f[n] * g[k]) % MOD) * g[n - k]) % MOD;
};
var countValidSequences = function (n, k) {
  let ans = comb(n - 1, k - 1);

  if ((n + k) % 2 === 0) {
    ans = (ans - comb((n + k) / 2 - 1, k - 1) + MOD) % MOD;
  }

  return Number(ans);
};

/**
 * Direction Assignments with Exactly K Visible People
 * Intuition: There are $\textit{pos}$ people to the left of position $\textit{pos}$, and $n - \textit{pos} - 1$ people to the right. We enumerate the number of visible people on the left, $a$, so the number of visible people on the right is $b = k - a$. If both $a$ and $b$ are valid, the answer increases by $2 \cdot \binom{\textit{pos}}{a} \cdot \binom{n - \textit{pos} - 1}{b}$. The factor of $2$ comes from the fact that the person at index $\textit{pos}$ can face either 'L' or 'R'. For the binomial coefficient $\binom{n}{k}$, we can precompute factorials and modular inverses for fast calculation. The time complexity is $O(n)$, where $n$ is the input integer $n$. The space complexity is $O(n)$ for storing factorials and modular inverses.
 * Approach: There are $\textit{pos}$ people to the left of position $\textit{pos}$, and $n - \textit{pos} - 1$ people to the right. We enumerate the number of visible people on the left, $a$, so the number of visible people on the right is $b = k - a$. If both $a$ and $b$ are valid, the answer increases by $2 \cdot \binom{\textit{pos}}{a} \cdot \binom{n - \textit{pos} - 1}{b}$. The factor of $2$ comes from the fact that the person at index $\textit{pos}$ can face either 'L' or 'R'. For the binomial coefficient $\binom{n}{k}$, we can precompute factorials and modular inverses for fast calculation. The time complexity is $O(n)$, where $n$ is the input integer $n$. The space complexity is $O(n)$ for storing factorials and modular inverses.
 * Dry Run: Input: n = 3, pos = 1, k = 0 => Output: 2
 * Time Complexity: O(O(n))
 * Space Complexity: O(O(n))
 */
const N = 100001;
const MOD = 1000000007n;

const f = Array(N).fill(0n);
const g = Array(N).fill(0n);

var qmi = function (a, k, p) {
  let res = 1n;
  while (k > 0n) {
    if (k & 1n) res = (res * a) % p;
    k >>= 1n;
    a = (a * a) % p;
  }
  return res;
};

f[0] = 1n;
g[0] = 1n;
for (let i = 1; i < N; i++) {
  f[i] = (f[i - 1] * BigInt(i)) % MOD;
  g[i] = qmi(f[i], MOD - 2n, MOD);
}

var comb = function (n, k) {
  return (((f[n] * g[k]) % MOD) * g[n - k]) % MOD;
};

var countVisiblePeople = function (n, pos, k) {
  const l = pos,
    r = n - pos - 1;
  let ans = 0n;

  for (let a = 0; a <= Math.min(k, l); a++) {
    const b = k - a;
    if (b <= r) {
      ans = (ans + ((((2n * comb(l, a)) % MOD) * comb(r, b)) % MOD)) % MOD;
    }
  }

  return Number(ans);
};

/**
 * Sum of K-Digit Numbers in a Range
 * Intuition: We enumerate each digit $x$ from the lowest position to the highest. Suppose the current position is the $i$-th digit (0-indexed), which contributes $x \cdot 10^i$ to the number. The remaining $k - 1$ digits each have $r - l + 1$ choices, so the contribution of the current position is $x \cdot 10^i \cdot (r - l + 1)^{k - 1}$. Since $x$ ranges over $[l, r]$, the sum of all values of $x$ is $\frac{(l + r) \cdot (r - l + 1)}{2}$. Therefore, the total sum of all such numbers is: $$ \begin{aligned} &\sum_{i = 0}^{k - 1} \frac{(l + r) \cdot (r - l + 1)}{2} \cdot (r - l + 1)^{k - 1} \cdot 10^i \\ = &\frac{(l + r) \cdot (r - l + 1)}{2} \cdot (r - l + 1)^{k - 1} \cdot \frac{10^k - 1}{9} \end{aligned} $$ Since $k$ can be up to $10^9$, we use fast power (binary exponentiation) to compute $(r - l + 1)^{k - 1}$ and $10^k$. Division by $9$ is handled using the modular inverse of $9$ via Fermat's littl...
 * Approach: We enumerate each digit $x$ from the lowest position to the highest. Suppose the current position is the $i$-th digit (0-indexed), which contributes $x \cdot 10^i$ to the number. The remaining $k - 1$ digits each have $r - l + 1$ choices, so the contribution of the current position is $x \cdot 10^i \cdot (r - l + 1)^{k - 1}$. Since $x$ ranges over $[l, r]$, the sum of all values of $x$ is $\frac{(l + r) \cdot (r - l + 1)}{2}$. Therefore, the total sum of all such numbers is: $$ \begin{aligned} &\sum_{i = 0}^{k - 1} \frac{(l + r) \cdot (r - l + 1)}{2} \cdot (r - l + 1)^{k - 1} \cdot 10^i \\ = &\frac{(l + r) \cdot (r - l + 1)}{2} \cdot (r - l + 1)^{k - 1} \cdot \frac{10^k - 1}{9} \end{aligned} $$ Since $k$ can be up to $10^9$, we use fast power (binary exponentiation) to compute $(r - l + 1)^{k - 1}$ and $10^k$. Division by $9$ is handled using the modular inverse of $9$ via Fermat's littl...
 * Dry Run: Input: l = 1, r = 2, k = 2 => Output: 66
 * Time Complexity: O(O(log k))
 * Space Complexity: O(O(1))
 */
var sumOfNumbers = function (l, r, k) {
  const mod = 1_000_000_007n;

  const n = BigInt(r - l + 1);

  // ((l + r) * (r - l + 1) / 2) % mod
  const sum = ((BigInt(l + r) * n) / 2n) % mod;

  // pow(r - l + 1, k - 1, mod)
  const part1 = qpow(n % mod, BigInt(k - 1), mod);

  // (pow(10, k, mod) - 1)
  const part2 = (qpow(10n, BigInt(k), mod) - 1n + mod) % mod;

  // Fermat inverse of 9
  const inv9 = qpow(9n, mod - 2n, mod);

  let ans = sum;
  ans = (ans * part1) % mod;
  ans = (ans * part2) % mod;
  ans = (ans * inv9) % mod;

  return Number(ans);
};

var qpow = function (a, n, mod) {
  a %= mod;
  let ans = 1n;
  while (n > 0n) {
    if ((n & 1n) === 1n) {
      ans = (ans * a) % mod;
    }
    a = (a * a) % mod;
    n >>= 1n;
  }
  return ans;
};

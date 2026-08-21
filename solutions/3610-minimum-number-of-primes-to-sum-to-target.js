/**
 * Minimum Number of Primes to Sum to Target
 * Intuition: Unbounded knapsack: form sum n using the first m primes, minimizing the number of summands.
 * Approach: 1. Sieve/generate the first m primes. 2. dp[s] = min coins to make s, dp[0]=0. 3. For each prime p, relax dp[i] = min(dp[i], dp[i-p]+1). 4. Return dp[n] or -1.
 * Dry Run: n = 10, m = 2 primes [2,3] → 2+2+3+3 uses 4.
 * Time Complexity: O(m * n + p(m)^2)
 * Space Complexity: O(n + m)
 */
var minNumberOfPrimes = function (n, m) {
  const primes = [];
  let candidate = 2;
  while (primes.length < m) {
    let isPrime = true;
    for (const prime of primes) {
      if (prime * prime > candidate) {
        break;
      }
      if (candidate % prime === 0) {
        isPrime = false;
        break;
      }
    }
    if (isPrime) {
      primes.push(candidate);
    }
    candidate++;
  }

  const INF = 1e9;
  const minCoins = Array(n + 1).fill(INF);
  minCoins[0] = 0;

  for (const prime of primes) {
    for (let sum = prime; sum <= n; sum++) {
      minCoins[sum] = Math.min(minCoins[sum], minCoins[sum - prime] + 1);
    }
  }

  return minCoins[n] < INF ? minCoins[n] : -1;
};

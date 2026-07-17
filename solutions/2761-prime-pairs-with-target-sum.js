/**
 * Prime Pairs With Target Sum
 *
 * Intuition:
 * We need to find all pairs:
 *
 *      x + y = n
 *
 * where both x and y are prime numbers and:
 *
 *      x <= y
 *
 * Instead of checking primality for every pair repeatedly, generate all
 * primes up to n once using the Sieve of Eratosthenes.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build an array isPrime[] using the Sieve of Eratosthenes.
 *
 * 2. Iterate x from 2 to n / 2.
 *
 * 3. Let:
 *
 *      y = n - x
 *
 * 4. If both x and y are prime, add [x, y] to the answer.
 *
 * 5. Since x increases from small to large, the pairs are automatically
 *    sorted by x.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 10
 *
 * Primes:
 *
 * 2, 3, 5, 7
 *
 * x = 2 -> y = 8  (not prime)
 * x = 3 -> y = 7  (✓)
 * x = 4 -> not prime
 * x = 5 -> y = 5  (✓)
 *
 * Answer:
 *
 * [[3,7],[5,5]]
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log log N)
 * Space Complexity: O(N)
 */

var findPrimePairs = function (n) {
  if (n < 4) return [];

  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  for (let i = 2; i * i <= n; i++) {
    if (!isPrime[i]) continue;

    for (let j = i * i; j <= n; j += i) {
      isPrime[j] = false;
    }
  }

  const answer = [];

  for (let x = 2; x <= Math.floor(n / 2); x++) {
    const y = n - x;

    if (isPrime[x] && isPrime[y]) {
      answer.push([x, y]);
    }
  }

  return answer;
};

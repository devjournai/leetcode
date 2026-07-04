/**
 * Count the Number of Square-Free Subsets
 *
 * Intuition:
 * Since every number is at most 30, it can only contain the first 10 prime
 * factors:
 *
 *      [2,3,5,7,11,13,17,19,23,29]
 *
 * Represent each valid number by a bitmask indicating which prime factors
 * appear exactly once.
 *
 * If a number contains any squared prime factor (like 4 = 2² or 12 = 2²×3),
 * it can never belong to a square-free subset.
 *
 * Dynamic Programming is performed over these prime masks.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Count the frequency of every number from 1 to 30.
 *
 * 2. For every number from 2 to 30:
 *
 *      a. If divisible by
 *             4,9,16,25
 *         skip it because it is not square-free.
 *
 *      b. Compute its prime mask.
 *
 * 3. DP:
 *
 *      dp[mask]
 *
 *      =
 *      number of ways to obtain the prime mask.
 *
 *      Initially:
 *
 *          dp[0]=1
 *
 * 4. Process every valid number.
 *
 *      For every existing mask:
 *
 *          If
 *
 *              mask & currentMask == 0
 *
 *          then
 *
 *              newMask =
 *                  mask | currentMask
 *
 *              dp[newMask]
 *                  +=
 *                  dp[mask] × frequency
 *
 * 5. Number 1 has no prime factors.
 *
 *      Every occurrence of 1 can either be:
 *
 *      - chosen
 *      - ignored
 *
 *      Therefore multiply the final answer by:
 *
 *          2^(countOfOnes)
 *
 * 6. Remove the empty subset.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 * [3,4,4,5]
 *
 * Frequencies:
 *
 * 3 ->1
 * 4 ->2
 * 5 ->1
 *
 * 4 contains
 *
 * 2²
 *
 * Ignore.
 *
 * Masks:
 *
 * 3
 * ->010
 *
 * 5
 * ->100
 *
 * DP:
 *
 * {}
 *
 * Add 3
 *
 * {3}
 *
 * Add 5
 *
 * {5}
 *
 * {3,5}
 *
 * Total
 *
 * =3
 *
 * Return 3.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(30 × 2^10)
 * Space Complexity: O(2^10)
 */

var squareFreeSubsets = function (nums) {
  const MOD = 1000000007n;

  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

  const freq = new Array(31).fill(0);

  for (const num of nums) {
    freq[num]++;
  }

  const dp = new Array(1 << 10).fill(0n);
  dp[0] = 1n;

  for (let num = 2; num <= 30; num++) {
    if (freq[num] === 0) continue;

    if (num % 4 === 0 || num % 9 === 0 || num % 16 === 0 || num % 25 === 0) {
      continue;
    }

    let mask = 0;

    for (let i = 0; i < 10; i++) {
      if (num % primes[i] === 0) {
        mask |= 1 << i;
      }
    }

    const next = [...dp];

    for (let state = 0; state < 1 << 10; state++) {
      if ((state & mask) !== 0) {
        continue;
      }

      next[state | mask] =
        (next[state | mask] + dp[state] * BigInt(freq[num])) % MOD;
    }

    for (let i = 0; i < 1 << 10; i++) {
      dp[i] = next[i];
    }
  }

  let answer = 0n;

  for (const ways of dp) {
    answer = (answer + ways) % MOD;
  }

  let multiplier = 1n;

  let base = 2n;
  let power = BigInt(freq[1]);

  while (power > 0n) {
    if (power & 1n) {
      multiplier = (multiplier * base) % MOD;
    }

    base = (base * base) % MOD;
    power >>= 1n;
  }

  answer = (answer * multiplier) % MOD;

  answer = (answer - 1n + MOD) % MOD;

  return Number(answer);
};

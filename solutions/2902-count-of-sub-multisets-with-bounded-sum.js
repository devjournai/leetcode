/**
 * Count of Sub-Multisets With Bounded Sum
 *
 * Intuition:
 * Treat equal values together.
 *
 * Suppose a value v appears c times.
 * We may choose it:
 *
 *      0,1,2,...,c times.
 *
 * Instead of processing every occurrence independently,
 * process every distinct value once using bounded knapsack DP.
 *
 * -----------------------------------------------------------------------
 *
 * DP
 *
 * dp[s]
 * =
 * number of ways to obtain sum s.
 *
 * Initially
 *
 *      dp[0] = 1
 *
 * -----------------------------------------------------------------------
 *
 * Transition
 *
 * For value = v with frequency = c
 *
 * We need
 *
 * newDp[s]
 * =
 * dp[s]
 * + dp[s-v]
 * + dp[s-2v]
 * + ...
 * + dp[s-cv]
 *
 * Computing this directly is O(c·sum).
 *
 * Instead use prefix sums over residues modulo v.
 *
 * -----------------------------------------------------------------------
 *
 * Prefix Optimization
 *
 * For every remainder
 *
 *      rem = 0...v-1
 *
 * Process
 *
 *      rem,
 *      rem+v,
 *      rem+2v...
 *
 * Maintain a sliding window of size (c+1).
 *
 * This gives O(sum).
 *
 * -----------------------------------------------------------------------
 *
 * Special Case
 *
 * Value = 0
 *
 * Choosing any number of zeros doesn't change the sum.
 *
 * If there are cnt zeros,
 *
 * every dp value is multiplied by
 *
 *      cnt + 1
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(S)
 * Space Complexity: O(S)
 */

var countSubMultisets = function (nums, l, r) {
  const MOD = 1000000007;

  const freq = new Map();

  for (const x of nums) {
    freq.set(x, (freq.get(x) || 0) + 1);
  }

  const maxSum = r;

  let dp = new Array(maxSum + 1).fill(0);
  dp[0] = 1;

  const values = [...freq.keys()].sort((a, b) => a - b);

  for (const value of values) {
    const count = freq.get(value);

    if (value === 0) {
      const mul = count + 1;

      for (let s = 0; s <= maxSum; s++) {
        dp[s] = (dp[s] * mul) % MOD;
      }

      continue;
    }

    const next = new Array(maxSum + 1).fill(0);

    for (let rem = 0; rem < value; rem++) {
      let window = 0;

      const queue = [];

      for (let sum = rem; sum <= maxSum; sum += value) {
        queue.push(dp[sum]);
        window = (window + dp[sum]) % MOD;

        if (queue.length > count + 1) {
          window -= queue.shift();
          if (window < 0) window += MOD;
        }

        next[sum] = window;
      }
    }

    dp = next;
  }

  let answer = 0;

  for (let s = l; s <= r; s++) {
    answer += dp[s];
    answer %= MOD;
  }

  return answer;
};

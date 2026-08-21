/**
 * Count of Sub-Multisets With Bounded Sum
 * Intuition: Group equal values and run bounded knapsack. Zeros only multiply the number of ways; other values use a sliding window over residue classes.
 * Approach: 1. Count frequencies. 2. dp[0]=1. 3. For zeros, multiply every dp[s] by (count+1). 4. For value v with count c, rebuild next[s] as a sliding window of size c+1 on sums congruent modulo v. 5. Sum dp[l..r].
 * Dry Run: nums = [1,2,2,3], l = 6, r = 6. Bounded knapsack has one way to make 6 ({1,2,3}). Answer 1.
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

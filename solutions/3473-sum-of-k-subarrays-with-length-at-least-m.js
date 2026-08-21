/**
 * Sum of K Subarrays With Length at Least M
 * Intuition: Choose `k` disjoint subarrays each of length ≥ `m` to maximize their total sum (negatives exist, so extra length is optional). DP on index, whether a segment is currently open, and remaining segments.
 * Approach: 1. Prefix sums for O(1) segment sums of length `m`. 2. `dp[i][0][rem]`: not inside a segment — skip `nums[i]`, or start a length-`m` block if `rem > 0`. 3. `dp[i][1][rem]`: inside a segment — close it here (same `i`, state 0) or extend by taking `nums[i]`. 4. Fill from the end; answer is `dp[0][0][k]`.
 * Dry Run: nums = [1,2,-1,3], k = 1, m = 2. Best is [1,2,-1,3] or [2,-1,3] depending on sums; starting a block of 2 then extending past -1 only if the tail helps.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N * K)
 */
var maxSum = function (nums, k, m) {
  const n = nums.length;
  const impossible = 1e15;
  const prefix = new Array(n + 1).fill(0);
  for (let index = 0; index < n; index++) {
    prefix[index + 1] = prefix[index] + nums[index];
  }

  const dp = Array.from({ length: n + 1 }, () =>
    Array.from({ length: 2 }, () => new Array(k + 1).fill(-impossible))
  );
  dp[n][0][0] = 0;
  dp[n][1][0] = 0;

  for (let index = n - 1; index >= 0; index--) {
    for (let remaining = 0; remaining <= k; remaining++) {
      dp[index][0][remaining] = dp[index + 1][0][remaining];
      if (remaining > 0 && index + m <= n) {
        dp[index][0][remaining] = Math.max(
          dp[index][0][remaining],
          dp[index + m][1][remaining - 1] + (prefix[index + m] - prefix[index])
        );
      }
      dp[index][1][remaining] = Math.max(
        dp[index][0][remaining],
        dp[index + 1][1][remaining] + nums[index]
      );
    }
  }

  return dp[0][0][k];
};

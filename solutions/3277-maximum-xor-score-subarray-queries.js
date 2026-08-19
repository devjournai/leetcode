/**
 * Maximum XOR Score Subarray Queries
 * Intuition: The XOR score of a subarray is defined recursively: score of a single element is itself, and a longer range collapses by XORing the scores of its two overlapping prefixes/suffixes. That recurrence is xors[i][j] = xors[i][j-1] XOR xors[i+1][j]. The answer for [l,r] is the max score over every subarray inside [l,r].
 * Approach: 1. Fill xors[i][i] = dp[i][i] = nums[i]. 2. Increasing length: xors[i][j] = xors[i][j-1] ^ xors[i+1][j], dp[i][j] = max(xors[i][j], dp[i][j-1], dp[i+1][j]). 3. Answer each query as dp[l][r].
 * Dry Run:
 *   nums = [2, 8, 4, 32], query [0, 2]
 *   Scores: 2, 8, 4, 2^8=10, 8^4=12, 10^12=6. Max in [0,2] is 12.
 * Time Complexity: O(n^2 + q)
 * Space Complexity: O(n^2)
 */
var maximumSubarrayXor = function (nums, queries) {
  const n = nums.length;
  const xors = Array.from({ length: n }, () => Array(n).fill(0));
  const dp = Array.from({ length: n }, () => Array(n).fill(0));

  for (let i = 0; i < n; i++) {
    xors[i][i] = nums[i];
    dp[i][i] = nums[i];
  }

  for (let d = 1; d < n; d++) {
    for (let i = 0; i + d < n; i++) {
      const j = i + d;
      xors[i][j] = xors[i][j - 1] ^ xors[i + 1][j];
      dp[i][j] = Math.max(xors[i][j], dp[i][j - 1], dp[i + 1][j]);
    }
  }

  return queries.map(([l, r]) => dp[l][r]);
};

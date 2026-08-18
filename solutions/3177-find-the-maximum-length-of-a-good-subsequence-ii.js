/**
 * Find the Maximum Length of a Good Subsequence II
 * Intuition: Same DP as 3176: a good subsequence allows at most k adjacent unequal pairs. Tracking the best length per change-count and per ending value is still O(nk) because maps stay proportional to distinct prefixes processed.
 * Approach: 1. Same as 3176. 2. `dp[count][num]` = max length with at most `count` unequal adjacent pairs ending in `num`. 3. For each num, iterate count from k down to 0, extend same ending by 1 and optionally switch from `maxLen[count - 1]`. 4. Return `maxLen[k]`.
 * Dry Run: nums = [1,2,1,1,3], k = 2
 *   Same transitions as 3176; answer is 4
 * Time Complexity: O(n k)
 * Space Complexity: O(n k)
 */
var maximumLength = function (nums, k) {
  const dp = Array.from({ length: k + 1 }, () => new Map());
  const maxLen = Array(k + 1).fill(0);

  for (const num of nums) {
    for (let count = k; count >= 0; count--) {
      dp[count].set(num, (dp[count].get(num) || 0) + 1);
      if (count > 0) {
        dp[count].set(num, Math.max(dp[count].get(num), maxLen[count - 1] + 1));
      }
      maxLen[count] = Math.max(maxLen[count], dp[count].get(num));
    }
  }

  return maxLen[k];
};

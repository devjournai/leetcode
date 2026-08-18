/**
 * Find the Maximum Length of a Good Subsequence I
 * Intuition: A good subsequence allows at most k adjacent pairs of unequal values. DP by remaining allowed changes and last value is enough because appending the same number never spends a change, while switching spends one.
 * Approach: 1. `dp[count][num]` = max length of a good subsequence with at most `count` unequal adjacent pairs ending in `num`. 2. `maxLen[count]` = max length with that many changes. 3. For each num, iterate count from k down to 0: extend the same ending (`dp[count][num] += 1`) and optionally take `maxLen[count - 1] + 1` after a change. 4. Update `maxLen[count]`. 5. Return `maxLen[k]`.
 * Dry Run: nums = [1,2,1,1,3], k = 2
 *   After 1: maxLen = [1,1,1]
 *   After 2: can attach with a change, maxLen[1]=2, maxLen[2]=2
 *   After more 1s and 3, best length with 2 changes is 4 (e.g. 1,2,1,1)
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

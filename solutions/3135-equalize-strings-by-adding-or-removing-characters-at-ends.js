/**
 * Equalize Strings by Adding or Removing Characters at Ends
 * Intuition: Characters may be added or removed only at the ends, so the preserved middle must be a contiguous common substring. The fewest operations equal |initial| + |target| - 2 * (longest common substring).
 * Approach: 1. Let dp[i][j] be the longest common suffix of initial[:i] and target[:j]. 2. If the last characters match, dp[i][j] = dp[i - 1][j - 1] + 1. 3. Track the global maximum common substring length. 4. Return m + n - 2 * that length.
 * Dry Run: initial = "abcde", target = "cdef"
 * - Matching run "cde" has length 3
 * - Operations = 5 + 4 - 2 * 3 = 3 (drop "ab", add "f")
 * Time Complexity: O(m n)
 * Space Complexity: O(m n)
 */
var minOperations = function (initial, target) {
  const m = initial.length;
  const n = target.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  let maxCommonLength = 0;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (initial[i - 1] === target[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        maxCommonLength = Math.max(maxCommonLength, dp[i][j]);
      }
    }
  }

  return m + n - 2 * maxCommonLength;
};

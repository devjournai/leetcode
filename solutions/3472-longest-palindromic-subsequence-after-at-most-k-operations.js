/**
 * Longest Palindromic Subsequence After at Most K Operations
 * Intuition: Same as LPS, but mismatched ends may be paired by spending `min(|a-b|, 26-|a-b|)` operations to make them equal (circular alphabet).
 * Approach: 1. `dp[i][j][op]` = LPS of `s[i..j]` with at most `op` operations. 2. Base: single letters are 1. 3. If `s[i]==s[j]`, take `2 + dp[i+1][j-1][op]`. 4. Else take max of skipping either end, or if `cost <= op` pair them with `2 + dp[i+1][j-1][op-cost]`.
 * Dry Run: s = "abced", k = 2. `a` and `d` cost 3 (too much); `b` and `d` cost 2, so "bcd" can become palindrome length 3, etc. Best uses the budget on a cheaper pair.
 * Time Complexity: O(N^2 * K)
 * Space Complexity: O(N^2 * K)
 */
function letterDistance(left, right) {
  const distance = Math.abs(left.charCodeAt(0) - right.charCodeAt(0));
  return Math.min(distance, 26 - distance);
}

var longestPalindromicSubsequence = function (s, k) {
  const n = s.length;
  const dp = Array.from({ length: n }, () =>
    Array.from({ length: n }, () => new Array(k + 1).fill(0))
  );

  for (let index = 0; index < n; index++) {
    for (let operations = 0; operations <= k; operations++) {
      dp[index][index][operations] = 1;
    }
  }

  for (let length = 1; length < n; length++) {
    for (let left = 0; left + length < n; left++) {
      const right = left + length;
      for (let operations = 0; operations <= k; operations++) {
        if (s[left] === s[right]) {
          dp[left][right][operations] =
            2 +
            (left + 1 <= right - 1 ? dp[left + 1][right - 1][operations] : 0);
        } else {
          dp[left][right][operations] = Math.max(
            dp[left + 1][right][operations],
            dp[left][right - 1][operations]
          );
          const cost = letterDistance(s[left], s[right]);
          if (cost <= operations) {
            const inner =
              left + 1 <= right - 1
                ? dp[left + 1][right - 1][operations - cost]
                : 0;
            dp[left][right][operations] = Math.max(
              dp[left][right][operations],
              2 + inner
            );
          }
        }
      }
    }
  }

  return dp[0][n - 1][k];
};

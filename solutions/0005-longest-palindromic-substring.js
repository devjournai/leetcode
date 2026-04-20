/**
 * Longest Palindromic Substring
 * Time Complexity: O(N²)
 * Space Complexity: O(N²)
 */

var longestPalindrome = function (str) {
  const n = str.length;
  if (n < 2) {
    return str;
  }

  let start = 0;
  let maxLen = 1;

  const dp = Array(n)
    .fill(0)
    .map(() => Array(n).fill(false));

  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  for (let i = 0; i < n - 1; i++) {
    if (str[i] === str[i + 1]) {
      dp[i][i + 1] = true;
      start = i;
      maxLen = 2;
    }
  }

  for (let k = 3; k <= n; k++) {
    for (let i = 0; i <= n - k; i++) {
      const j = i + k - 1;

      if (dp[i + 1][j - 1] && str[i] === str[j]) {
        dp[i][j] = true;

        if (k > maxLen) {
          start = i;
          maxLen = k;
        }
      }
    }
  }

  return str.substring(start, start + maxLen);
};

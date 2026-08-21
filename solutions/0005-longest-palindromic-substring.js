/**
 * Longest Palindromic Substring
 * Intuition: A boolean DP table `dp[i][j]` is true when `str[i..j]` is a palindrome: singles and adjacent pairs are seeded, then longer windows of length `k` are true when the inner substring is a palindrome and the ends match.
 * Approach: 1. Return `str` if `n < 2`. 2. Allocate `dp[n][n]` and mark all `dp[i][i]`. 3. Mark length-2 palindromes and track `start`/`maxLen`. 4. For `k` from 3 to `n`, for each `i` with `j = i+k-1`, set `dp[i][j]` if `dp[i+1][j-1]` and `str[i]===str[j]`, updating `start`/`maxLen` when `k` is larger. 5. Return `str.substring(start, start + maxLen)`.
 * Dry Run: str = "babad", n=5.
 *   - singles true; "ba","ab","ba","ad" not length-2 palindromes.
 *   - k=3, i=0, j=2: inner "a" true, 'b'=='b' → dp[0][2], start=0, maxLen=3 ("bab").
 *   - k=3, i=1, j=3: "aba" also palindrome, start=1, maxLen=3 ("aba"). Return "aba".
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

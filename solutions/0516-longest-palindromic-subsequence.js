/**
 * Longest Palindromic Subsequence
 * Intuition: `dp[i][j]` is LPS length of `s[i..j]`. Matching ends add 2 plus the inner interval; otherwise take the better of shrinking left or right.
 * Approach: 1. Zero-fill `dpResultMatrix`. 2. Iterate `i` from n-1 down to 0; set `dp[i][i]=1`. 3. For `j>i`, if `s[i]===s[j]` use `2+dp[i+1][j-1]`, else `max(dp[i+1][j], dp[i][j-1])`. 4. Return `dp[0][n-1]`.
 * Dry Run: s = "bbbab".
 *   - Singles=1. "bbb" grows to 3; whole string ends match 'b'…'b' → 4. Return 4.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var longestPalindromeSubseq = function (s) {
  const inputStringLength = s.length;

  if (inputStringLength === 0) {
    return 0;
  }

  const dpResultMatrix = Array(inputStringLength)
    .fill(null)
    .map(() => Array(inputStringLength).fill(0));

  for (
    let outerLoopIndex = inputStringLength - 1;
    outerLoopIndex >= 0;
    outerLoopIndex--
  ) {
    dpResultMatrix[outerLoopIndex][outerLoopIndex] = 1;
    for (
      let innerLoopIndex = outerLoopIndex + 1;
      innerLoopIndex < inputStringLength;
      innerLoopIndex++
    ) {
      if (s[outerLoopIndex] === s[innerLoopIndex]) {
        dpResultMatrix[outerLoopIndex][innerLoopIndex] =
          2 + dpResultMatrix[outerLoopIndex + 1][innerLoopIndex - 1];
      } else {
        dpResultMatrix[outerLoopIndex][innerLoopIndex] = Math.max(
          dpResultMatrix[outerLoopIndex + 1][innerLoopIndex],
          dpResultMatrix[outerLoopIndex][innerLoopIndex - 1]
        );
      }
    }
  }

  return dpResultMatrix[0][inputStringLength - 1];
};

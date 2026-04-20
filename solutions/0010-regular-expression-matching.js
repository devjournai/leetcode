/**
 * Regular Expression Matching
 * Time Complexity: O(N*M)
 * Space Complexity: O(N*M)
 */
var isMatch = function (text, pattern) {
  const textLength = text.length;
  const patternLength = pattern.length;

  const dp = Array(textLength + 1)
    .fill(null)
    .map(() => Array(patternLength + 1).fill(false));

  dp[0][0] = true;

  for (let pIdx = 1; pIdx <= patternLength; pIdx++) {
    if (pattern[pIdx - 1] === "*") {
      dp[0][pIdx] = dp[0][pIdx - 2];
    }
  }

  for (let tIdx = 1; tIdx <= textLength; tIdx++) {
    for (let pIdx = 1; pIdx <= patternLength; pIdx++) {
      if (pattern[pIdx - 1] === "." || pattern[pIdx - 1] === text[tIdx - 1]) {
        dp[tIdx][pIdx] = dp[tIdx - 1][pIdx - 1];
      } else if (pattern[pIdx - 1] === "*") {
        dp[tIdx][pIdx] = dp[tIdx][pIdx - 2];
        if (pattern[pIdx - 2] === "." || pattern[pIdx - 2] === text[tIdx - 1]) {
          dp[tIdx][pIdx] = dp[tIdx][pIdx] || dp[tIdx - 1][pIdx];
        }
      } else {
        dp[tIdx][pIdx] = false;
      }
    }
  }

  return dp[textLength][patternLength];
};

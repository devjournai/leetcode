/**
 * Regular Expression Matching
 * Intuition: `dp[tIdx][pIdx]` is whether the first `tIdx` text chars match the first `pIdx` pattern chars. A letter or `.` copies the diagonal; `*` can drop the `x*` pair (`dp[..][pIdx-2]`) or, if `x` matches the current text char, reuse `dp[tIdx-1][pIdx]`.
 * Approach: 1. Allocate `(textLength+1) x (patternLength+1)` false grid; set `dp[0][0]`. 2. Fill empty-text row: if pattern[pIdx-1] is `*`, copy `dp[0][pIdx-2]`. 3. For each text/pattern index, on `.` or equal chars set diagonal. 4. On `*`, first take zero-occurrence, then OR previous-text cell if the preceding pattern char matches. 5. Return `dp[textLength][patternLength]`.
 * Dry Run: text = "aa", pattern = "a*".
 *   - dp[0][2] true (`a*` matches empty). dp[1][2]: zero-occ false, `a` matches 'a' so OR dp[0][2] → true. dp[2][2] similarly true. Return true.
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

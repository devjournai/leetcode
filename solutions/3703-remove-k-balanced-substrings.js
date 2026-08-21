/**
 * Remove K-Balanced Substrings
 * Intuition: A k-balanced piece is k '(' followed by k ')'. A run-length stack can cancel those runs as soon as k closing parens complete a matching open run.
 * Approach: 1. Compress consecutive characters on a stack. 2. When a ')' run reaches length k and the previous '(' run is at least k, pop the closers and shrink the openers by k.
 * Dry Run: s = "(())", k = 1 repeatedly strips "()" until empty.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeSubstring = function (s, k) {
  const runs = [];
  for (const char of s) {
    if (runs.length && runs[runs.length - 1][0] === char) {
      runs[runs.length - 1][1]++;
    } else {
      runs.push([char, 1]);
    }
    if (
      char === ")" &&
      runs.length > 1 &&
      runs[runs.length - 1][1] === k &&
      runs[runs.length - 2][1] >= k
    ) {
      runs.pop();
      runs[runs.length - 1][1] -= k;
      if (runs[runs.length - 1][1] === 0) {
        runs.pop();
      }
    }
  }
  let result = "";
  for (const [char, count] of runs) {
    result += char.repeat(count);
  }
  return result;
};

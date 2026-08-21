/**
 * Maximum Substrings With Distinct Start
 * Intuition: Implement Maximum Substrings With Distinct Start following the editorial simulation.
 * Approach: Implement Maximum Substrings With Distinct Start following the editorial simulation.
 * Dry Run: Input s = "abab". Output 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxDistinct = function (s) {
  let ans = 0;
  const cnt = Array(26).fill(0);
  for (const ch of s) {
    const idx = ch.charCodeAt(0) - 97;
    if (++cnt[idx] === 1) {
      ++ans;
    }
  }
  return ans;
};

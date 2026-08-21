/**
 * Substring Matching Pattern
 * Intuition: Pattern p is prefix + '*' + suffix. A match exists if some occurrence of prefix is followed later by suffix (they may overlap only after the prefix ends).
 * Approach: 1. Split p at the first '*'. 2. Find prefix in s. 3. Search for suffix starting at that index plus prefix length.
 * Dry Run: s = "leetcode", p = "ee*e". prefix "ee" at 1, suffix "e" found at 7. True.
 * Time Complexity: O(N * M)
 * Space Complexity: O(1)
 */

var hasMatch = function (s, p) {
  const starIndex = p.indexOf("*");
  const prefix = p.slice(0, starIndex);
  const suffix = p.slice(starIndex + 1);
  const prefixIndex = s.indexOf(prefix);
  if (prefixIndex === -1) {
    return false;
  }
  return s.indexOf(suffix, prefixIndex + prefix.length) !== -1;
};

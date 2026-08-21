/**
 * Longest Uncommon Subsequence I
 * Intuition: If the strings are equal, every subsequence of one is a subsequence of the other, so no uncommon subsequence exists. Otherwise the longer string itself is uncommon.
 * Approach: 1. If `a === b` return -1. 2. Else return `Math.max(a.length, b.length)`.
 * Dry Run: a = "aba", b = "cdc".
 *   - Unequal, max length 3. Return 3. If a===b, return -1.
 * Time Complexity: O(min(lengthA, lengthB))
 * Space Complexity: O(1)
 */
var findLUSlength = function (a, b) {
  return a === b ? -1 : Math.max(a.length, b.length);
};

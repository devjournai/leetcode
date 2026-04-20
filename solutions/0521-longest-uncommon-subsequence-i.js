/**
 * Longest Uncommon Subsequence I
 * Time Complexity: O(min(lengthA, lengthB))
 * Space Complexity: O(1)
 */
var findLUSlength = function (a, b) {
  return a === b ? -1 : Math.max(a.length, b.length);
};

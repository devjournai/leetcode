/**
 * Find The Difference
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findTheDifference = function (s, t) {
  let xorAccumulator = 0;

  for (let currentSChar of s) {
    xorAccumulator ^= currentSChar.charCodeAt(0);
  }

  for (let currentTChar of t) {
    xorAccumulator ^= currentTChar.charCodeAt(0);
  }

  return String.fromCharCode(xorAccumulator);
};

/**
 * Find Smallest Letter Greater Than Target
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var nextGreatestLetter = function (letters, target) {
  return letters.find((l) => l > target) || letters[0];
};

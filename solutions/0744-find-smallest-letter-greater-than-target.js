/**
 * Find Smallest Letter Greater Than Target
 * Intuition: Letters are sorted and wrap around. The first letter strictly greater than `target` is the answer; if none exist, wrap to `letters[0]`.
 * Approach: 1. `letters.find((l) => l > target)`. 2. If that is falsy, return `letters[0]`.
 * Dry Run: letters = ["c","f","j"], target = "a" → "c". target = "j" → wrap to "c".
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var nextGreatestLetter = function (letters, target) {
  return letters.find((l) => l > target) || letters[0];
};

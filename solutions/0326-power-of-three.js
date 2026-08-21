/**
 * Power Of Three
 * Intuition: In 32-bit signed range the largest power of 3 is 3^19 = 1162261467. A positive n is a power of 3 iff that constant is divisible by n.
 * Approach: 1. If n <= 0 return false. 2. Return (1162261467 % n) === 0.
 * Dry Run: n = 27.
 *   - 1162261467 % 27 === 0 → true. n = 0 is rejected by n <= 0.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isPowerOfThree = function (n) {
  if (n <= 0) {
    return false;
  }

  const largestPossiblePowerOfThree = 1162261467;

  const divisionCheck = largestPossiblePowerOfThree % n;

  const resultIndicator = divisionCheck === 0;

  return resultIndicator;
};

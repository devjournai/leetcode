/**
 * Power Of Two
 * Intuition: A positive power of two has exactly one bit set, so n & (n-1) clears that bit and yields 0.
 * Approach: 1. Require n > 0. 2. Return whether (n & (n-1)) === 0.
 * Dry Run: n = 8 (1000b).
 *   - 8 > 0 and 8 & 7 = 0 → true.
 *   - n = 6 (110b): 6 & 5 = 4 ≠ 0 → false.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isPowerOfTwo = function (n) {
  return n > 0 && (n & (n - 1)) === 0;
};

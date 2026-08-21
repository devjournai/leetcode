/**
 * Bitwise OR Of Even Numbers In An Array
 * Intuition: Odd numbers do not affect an even-only OR, so OR every even value (0 if none).
 * Approach: Scan nums and bitwise-OR each even number into the answer.
 * Dry Run: nums = [1, 2, 3, 4, 5] → 2 | 4 = 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var evenNumberBitwiseORs = function (nums) {
  let evenOr = 0;
  for (const value of nums) {
    if (value % 2 === 0) {
      evenOr |= value;
    }
  }
  return evenOr;
};

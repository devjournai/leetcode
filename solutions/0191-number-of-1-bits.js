/**
 * Number Of 1 Bits
 * Intuition: n & (n - 1) clears the lowest set bit. Repeat until n is 0; the iteration count is the Hamming weight.
 * Approach: 1. Count = 0. 2. While n !== 0, increment count and set n = n & (n - 1). 3. Return count.
 * Dry Run: n = 11 (1011).
 *   - 1011 → 1010, count=1; → 1000, count=2; → 0000, count=3. Return 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var hammingWeight = function (n) {
  let setBitCount = 0;

  while (n !== 0) {
    setBitCount++;
    n = n & (n - 1);
  }

  return setBitCount;
};

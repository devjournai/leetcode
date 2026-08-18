/**
 * Maximum Number That Makes Result Of Bitwise AND Zero
 * Intuition: Any number whose highest set bit is strictly below the highest set bit of `n` ANDed with a power of two in `(x, n]` is zero. The largest such `x` is `2^{floor(log2(n))} - 1`, i.e. all bits below n's highest bit.
 * Approach: 1. Find the highest bit position of `n` using BigInt so values up to 1e18 stay exact. 2. Return `(1 << thatBit) - 1`.
 * Dry Run:
 * Input: n = 7 (1101 in a larger example n=5 is 101)
 * For n = 5 (101), highest bit is 4, answer 3 (011). Then 3 & 4 = 0 and 4 <= 5.
 * Time Complexity: O(log n)
 * Space Complexity: O(1).
 */
var maxNumber = function (n) {
  let highestPowerOfTwo = 1n;
  const unsignedN = BigInt(n);
  while (highestPowerOfTwo << 1n <= unsignedN) {
    highestPowerOfTwo <<= 1n;
  }
  return Number(highestPowerOfTwo - 1n);
};

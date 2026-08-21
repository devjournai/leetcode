/**
 * Power Of Four
 * Intuition: A power of four is a positive power of two whose single 1-bit sits on an even index (bit 0, 2, 4, ...). Mask 0xAAAAAAAA flags the odd bit positions, so those bits must be clear.
 * Approach: 1. If n <= 0 return false. 2. firstVerification: n is a power of two via (n & (n - 1)) === 0. 3. secondVerification: (n & 0xAAAAAAAA) === 0. 4. Return both.
 * Dry Run: n = 16.
 *   - 16 is 1 << 4; n & (n - 1) is 0; bit 4 is even so the odd-bit mask is 0 → true. n = 8 fails the mask.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isPowerOfFour = function (n) {
  if (n <= 0) {
    return false;
  }

  const firstVerification = (n & (n - 1)) === 0;
  const bitPositionMask = 0xaaaaaaaa;
  const secondVerification = (n & bitPositionMask) === 0;

  return firstVerification && secondVerification;
};

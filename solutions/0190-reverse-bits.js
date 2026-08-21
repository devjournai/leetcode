/**
 * Reverse Bits
 * Intuition: Build the reversed 32-bit integer by repeatedly shifting the result left, appending n's lowest bit, then unsigned-shifting n right.
 * Approach: 1. Start reversed = 0. 2. Repeat 32 times: shift reversed left by 1, OR in (n & 1), then n >>>= 1. 3. Return reversed.
 * Dry Run: n = 5 (...00000101).
 *   - Bit 0: reversed gets 1, n becomes ...00000010.
 *   - Bit 1: reversed gets 0, n becomes ...00000001.
 *   - Bit 2: reversed gets 1, then 29 more left-shifts pad to 32 bits. Result is 5 reversed in 32 bits (0xa0000000).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var reverseBits = function (n) {
  let reversedValue = 0;
  let bitIterationCount = 32;

  for (
    let currentPosition = 0;
    currentPosition < bitIterationCount;
    currentPosition++
  ) {
    reversedValue <<= 1;
    const extractedBit = n & 1;
    reversedValue |= extractedBit;
    n >>>= 1;
  }

  return reversedValue;
};

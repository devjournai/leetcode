/**
 * 1 Bit And 2 Bit Characters
 * Intuition: Decode uniquely from the left: `0` is a 1-bit character; `1` starts a 2-bit character. The last character is a 1-bit `0` iff we land exactly on the last index after decoding everything before it.
 * Approach: 1. Walk `currentBitIndex` while it is `< totalBitsCount - 1`. 2. Advance by 1 on `0`, by 2 on `1`. 3. Return whether `currentBitIndex === totalBitsCount - 1`.
 * Dry Run: [1,0,0]. Decode 10 then stop at last 0 → true. [1,1,1,0] lands past the last bit → false.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isOneBitCharacter = function (bits) {
  let currentBitIndex = 0;
  const totalBitsCount = bits.length;

  while (currentBitIndex < totalBitsCount - 1) {
    if (bits[currentBitIndex] === 0) {
      currentBitIndex++;
    } else {
      currentBitIndex += 2;
    }
  }

  return currentBitIndex === totalBitsCount - 1;
};

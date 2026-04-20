/**
 * 1 Bit And 2 Bit Characters
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

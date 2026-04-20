/**
 * Find Kth Bit in Nth Binary String
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findKthBit = function (n, k) {
  let levelIterator = n;
  let bitPosition = k;
  let inversionTracker = 0;

  while (levelIterator > 1) {
    const currentLevelLength = (1 << levelIterator) - 1;
    const middleMark = (currentLevelLength + 1) / 2;

    if (bitPosition === middleMark) {
      return inversionTracker % 2 === 0 ? "1" : "0";
    } else if (bitPosition < middleMark) {
      levelIterator--;
    } else {
      inversionTracker++;
      bitPosition = currentLevelLength - bitPosition + 1;
      levelIterator--;
    }
  }
  return inversionTracker % 2 === 0 ? "0" : "1";
};

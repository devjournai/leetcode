/**
 * Binary Gap
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var binaryGap = function (n) {
  let maximumDistance = 0;
  let lastSetBitPosition = -1;
  let currentBitPosition = 0;

  while (n > 0) {
    if ((n & 1) === 1) {
      if (lastSetBitPosition !== -1) {
        const currentCalculatedDistance =
          currentBitPosition - lastSetBitPosition;
        maximumDistance = Math.max(maximumDistance, currentCalculatedDistance);
      }
      lastSetBitPosition = currentBitPosition;
    }
    n >>= 1;
    currentBitPosition++;
  }

  return maximumDistance;
};

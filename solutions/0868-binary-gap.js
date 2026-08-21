/**
 * Binary Gap
 * Intuition: Scan bits from LSB. Whenever a 1 appears, the gap from the previous 1's position is a candidate max distance.
 * Approach: 1. While n>0: if LSB is 1 and `lastSetBitPosition` is set, max with `currentBitPosition - last`. 2. Update last, n>>=1, position++. 3. Return max (0 if fewer than two 1s).
 * Dry Run: n=22 (10110). 1-bits at positions 1 and 2 (gap 1), then 4 (gap 2). Return 2.
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

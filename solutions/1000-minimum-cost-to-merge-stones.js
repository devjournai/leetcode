/**
 * Minimum Cost To Merge Stones
 * Time Complexity: O(n^3)
 * Space Complexity: O(n^2)
 */
var mergeStones = function (stones, k) {
  const arrayLength = stones.length;
  if ((arrayLength - 1) % (k - 1) !== 0) {
    return -1;
  }

  const prefixTotalArray = new Array(arrayLength + 1).fill(0);
  for (let idx = 0; idx < arrayLength; idx++) {
    prefixTotalArray[idx + 1] = prefixTotalArray[idx] + stones[idx];
  }

  const costTable = new Array(arrayLength)
    .fill()
    .map(() => new Array(arrayLength).fill(0));

  const mergeFactor = k - 1;

  for (let segmentLength = k; segmentLength <= arrayLength; segmentLength++) {
    for (
      let segmentStart = 0;
      segmentStart + segmentLength <= arrayLength;
      segmentStart++
    ) {
      const segmentEnd = segmentStart + segmentLength - 1;
      costTable[segmentStart][segmentEnd] = Infinity;

      for (
        let splitPoint = segmentStart;
        splitPoint < segmentEnd;
        splitPoint += mergeFactor
      ) {
        costTable[segmentStart][segmentEnd] = Math.min(
          costTable[segmentStart][segmentEnd],
          costTable[segmentStart][splitPoint] +
            costTable[splitPoint + 1][segmentEnd],
        );
      }

      if ((segmentLength - 1) % mergeFactor === 0) {
        costTable[segmentStart][segmentEnd] +=
          prefixTotalArray[segmentEnd + 1] - prefixTotalArray[segmentStart];
      }
    }
  }

  return costTable[0][arrayLength - 1];
};

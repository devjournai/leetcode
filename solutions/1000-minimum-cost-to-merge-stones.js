/**
 * Minimum Cost To Merge Stones
 * Intuition: Interval DP: merge k piles at a time. Impossible unless `(n-1)%(k-1)===0`. Cost of fully merging [L,R] is min split costs plus the prefix sum of that range.
 * Approach: 1. Return -1 if leftover constraint fails. 2. Build `prefixTotalArray`. 3. For increasing `segmentLength`, try `splitPoint` steps of `k-1`; take min of left+right DP. 4. If `(len-1)%(k-1)===0`, add range sum. 5. Return `costTable[0][n-1]`.
 * Dry Run: stones = [3,2,4,1], k=2. Always mergeable. DP combines adjacent then larger intervals; min cost 20.
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
            costTable[splitPoint + 1][segmentEnd]
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

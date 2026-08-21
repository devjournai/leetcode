/**
 * Maximum Distance In Arrays
 * Intuition: Each array is sorted, so extrema are at the ends. The global max distance uses one min and one max from different arrays. Scan arrays after the first, comparing each new array’s ends against the running min/max of previous arrays, then update those extrema.
 * Approach: 1. Seed `overallMinimumValue`/`overallMaximumValue` from `arrays[0]`. 2. For each later `currentArray`, compute `potentialDifferenceOne = |last - overallMin|` and `potentialDifferenceTwo = |overallMax - first|`. 3. Update `maxDistanceResult` with those. 4. Update overall min/max with this array’s ends.
 * Dry Run: arrays=[[1,2,3],[4,5],[1,2,3]].
 *   - Seed min1 max3. vs [4,5]: |5-1|=4, |3-4|=1 → 4; min still 1 max 5. vs [1,2,3]: |3-1|=2, |5-1|=4 → 4.
 * Time Complexity: O(M)
 * Space Complexity: O(1)
 */
var maxDistance = function (arrays) {
  let maxDistanceResult = 0;
  let overallMinimumValue = arrays[0][0];
  let overallMaximumValue = arrays[0][arrays[0].length - 1];

  for (
    let currentArrayIndex = 1;
    currentArrayIndex < arrays.length;
    currentArrayIndex++
  ) {
    let currentArray = arrays[currentArrayIndex];
    let currentArrayFirstElement = currentArray[0];
    let currentArrayLastElement = currentArray[currentArray.length - 1];

    let potentialDifferenceOne = Math.abs(
      currentArrayLastElement - overallMinimumValue
    );
    let potentialDifferenceTwo = Math.abs(
      overallMaximumValue - currentArrayFirstElement
    );

    maxDistanceResult = Math.max(
      maxDistanceResult,
      potentialDifferenceOne,
      potentialDifferenceTwo
    );

    overallMinimumValue = Math.min(
      overallMinimumValue,
      currentArrayFirstElement
    );
    overallMaximumValue = Math.max(
      overallMaximumValue,
      currentArrayLastElement
    );
  }

  return maxDistanceResult;
};

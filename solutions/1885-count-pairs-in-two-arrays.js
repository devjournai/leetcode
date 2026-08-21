/**
 * Count Pairs In Two Arrays
 * Intuition: nums1[i]+nums1[j] > nums2[i]+nums2[j] iff (nums1-nums2)[i] + (nums1-nums2)[j] > 0. Sort diffs and binary-search partners.
 * Approach: 1. Build sorted `diffArrayGenerated`. 2. For each i, find first j>i with diff[j] > -diff[i] via `findFirstElementGreater`. 3. Add the suffix count.
 * Dry Run: nums1=[1,2,3], nums2=[1,2,1]. diffs=[0,0,2]. Pair (0,2) and (1,2). Return 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var countPairs = function (inputNum1, inputNum2) {
  const inputLength = inputNum1.length;

  const diffArrayGenerated = inputNum1.map(
    (mapCurrentVal, mapCurrentIdx) => mapCurrentVal - inputNum2[mapCurrentIdx]
  );

  diffArrayGenerated.sort((compA, compB) => compA - compB);

  let totalPairsFound = 0;

  const findFirstElementGreater = (bsArr, bsTarget, bsLowerBound) => {
    let bsCurrentLow = bsLowerBound;
    let bsCurrentHigh = bsArr.length - 1;
    let bsResultIdx = bsArr.length;

    while (bsCurrentLow <= bsCurrentHigh) {
      let bsMidpoint = Math.floor(
        bsCurrentLow + (bsCurrentHigh - bsCurrentLow) / 2
      );
      if (bsArr[bsMidpoint] > bsTarget) {
        bsResultIdx = bsMidpoint;
        bsCurrentHigh = bsMidpoint - 1;
      } else {
        bsCurrentLow = bsMidpoint + 1;
      }
    }
    return bsResultIdx;
  };

  for (
    let firstPointerIndex = 0;
    firstPointerIndex < inputLength;
    ++firstPointerIndex
  ) {
    const searchTargetVal = -diffArrayGenerated[firstPointerIndex];
    const binarySearchStartIndex = firstPointerIndex + 1;

    const foundJIndex = findFirstElementGreater(
      diffArrayGenerated,
      searchTargetVal,
      binarySearchStartIndex
    );

    if (foundJIndex < inputLength) {
      totalPairsFound += inputLength - foundJIndex;
    }
  }

  return totalPairsFound;
};

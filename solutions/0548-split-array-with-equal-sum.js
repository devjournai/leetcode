/**
 * Split Array With Equal Sum
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */
var splitArray = function (nums) {
  const numsLength = nums.length;
  if (numsLength < 7) {
    return false;
  }

  const cumulativeSums = new Array(numsLength + 1).fill(0);
  for (let indexVal = 0; indexVal < numsLength; indexVal++) {
    cumulativeSums[indexVal + 1] = cumulativeSums[indexVal] + nums[indexVal];
  }

  const segmentSumFinder = (startIndex, endIndex) => {
    return cumulativeSums[endIndex + 1] - cumulativeSums[startIndex];
  };

  for (let pivotIndexJ = 3; pivotIndexJ < numsLength - 3; pivotIndexJ++) {
    const establishedSums = new Set();
    for (
      let candidateIndexI = 1;
      candidateIndexI < pivotIndexJ - 1;
      candidateIndexI++
    ) {
      const leftmostSum = segmentSumFinder(0, candidateIndexI - 1);
      const middleLeftSum = segmentSumFinder(
        candidateIndexI + 1,
        pivotIndexJ - 1,
      );
      if (leftmostSum === middleLeftSum) {
        establishedSums.add(leftmostSum);
      }
    }

    for (
      let splitIndexK = pivotIndexJ + 2;
      splitIndexK < numsLength - 1;
      splitIndexK++
    ) {
      const middleRightSum = segmentSumFinder(pivotIndexJ + 1, splitIndexK - 1);
      const rightmostSum = segmentSumFinder(splitIndexK + 1, numsLength - 1);
      if (
        middleRightSum === rightmostSum &&
        establishedSums.has(middleRightSum)
      ) {
        return true;
      }
    }
  }

  return false;
};

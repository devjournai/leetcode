/**
 * Split Array With Equal Sum
 * Intuition: Need indices i < j < k splitting into four equal-sum segments (cuts are excluded). Prefix sums give O(1) range sums. Fix middle cut `j`, collect equal left-pair sums, then check if a right pair matches one of those sums.
 * Approach: 1. Reject length < 7. 2. Build `cumulativeSums`. 3. For each `j` from 3 to n-4: for each valid `i`, if left two segments match, add that sum to a Set. 4. For each valid `k`, if right two segments match and that sum is in the Set, return true. 5. Else false.
 * Dry Run: nums = [1,2,1,2,1,2,1].
 *   - j=3: i=1 gives segments 1 and 1; Set {1}. k=5 gives 1 and 1, in Set. Return true.
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
        pivotIndexJ - 1
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

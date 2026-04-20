/**
 * Last Stone Weight II
 * Time Complexity: O(N * S)
 * Space Complexity: O(S)
 */
var lastStoneWeightII = function (stones) {
  let overallWeightSum = 0;
  for (
    let iterationIndex = 0;
    iterationIndex < stones.length;
    iterationIndex++
  ) {
    overallWeightSum += stones[iterationIndex];
  }

  let halfWeightTarget = Math.floor(overallWeightSum / 2);

  let dpSums = new Array(halfWeightTarget + 1).fill(false);
  dpSums[0] = true;

  for (const currentStoneValue of stones) {
    for (
      let currentSumCandidate = halfWeightTarget;
      currentSumCandidate >= currentStoneValue;
      currentSumCandidate--
    ) {
      if (dpSums[currentSumCandidate - currentStoneValue]) {
        dpSums[currentSumCandidate] = true;
      }
    }
  }

  let largestPossibleSum = 0;
  let findMaxIndex = halfWeightTarget;
  while (findMaxIndex >= 0) {
    if (dpSums[findMaxIndex]) {
      largestPossibleSum = findMaxIndex;
      break;
    }
    findMaxIndex--;
  }

  let finalWeightDifference = overallWeightSum - 2 * largestPossibleSum;
  return finalWeightDifference;
};

/**
 * Last Stone Weight II
 * Intuition: Smashing is equivalent to partitioning into two piles and returning |sumA-sumB| = total-2*subset. Maximize a subset sum <= total/2.
 * Approach: 1. Sum stones; target = floor(sum/2). 2. Boolean knapsack: dp[s] true if some subset sums to s. 3. Find the largest true s <= target. 4. Return total-2*s.
 * Dry Run: stones = [2,7,4,1,8,1], sum=23, target=11.
 *   - Best subset 11 (e.g. 2+8+1). Difference 23-22=1.
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

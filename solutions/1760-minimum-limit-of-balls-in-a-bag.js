/**
 * Minimum Limit Of Balls In A Bag
 * Intuition: Penalty is the max bag after splits. Binary-search the penalty P: a bag of size x needs ceil(x/P)−1 splits. Feasible if total splits ≤ maxOperations.
 * Approach: 1. Search `lowerBound=1` .. max(nums). 2. For `testPenalty`, sum ceil(bag/P)−1. 3. If ≤ maxOperations, try smaller; else raise the bound. 4. Return `optimalPenalty`.
 * Dry Run: nums = [2,4,8,2], maxOperations = 4
 * P=4: splits 0+0+1+0=1 ≤4; P=2: 0+1+3+0=4; P=1 needs more. Answer 2.
 * Time Complexity: O(N * log(M)
 * Space Complexity: O(1)
 */
var minimumSize = function (nums, maxOperations) {
  let lowerBound = 1;
  let upperBound = 0;
  for (const valueEntry of nums) {
    if (valueEntry > upperBound) {
      upperBound = valueEntry;
    }
  }

  let optimalPenalty = upperBound;

  while (lowerBound <= upperBound) {
    const testPenalty = Math.floor((lowerBound + upperBound) / 2);
    let requiredOperationCount = 0;

    for (const bagSize of nums) {
      requiredOperationCount += Math.ceil(bagSize / testPenalty) - 1;
    }

    if (requiredOperationCount <= maxOperations) {
      optimalPenalty = testPenalty;
      upperBound = testPenalty - 1;
    } else {
      lowerBound = testPenalty + 1;
    }
  }

  return optimalPenalty;
};

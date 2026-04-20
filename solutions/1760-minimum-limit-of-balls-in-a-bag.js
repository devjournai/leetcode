/**
 * Minimum Limit Of Balls In A Bag
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

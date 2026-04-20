/**
 * 2 Keys Keyboard
 * Time Complexity: O(sqrt(n))
 * Space Complexity: O(1)
 */
var minSteps = function (n) {
  let totalOperations = 0;
  let currentFactorCandidate = 2;
  let remainingTarget = n;

  for (; remainingTarget > 1; ) {
    while (remainingTarget % currentFactorCandidate === 0) {
      totalOperations += currentFactorCandidate;
      remainingTarget /= currentFactorCandidate;
    }
    currentFactorCandidate++;
  }

  return totalOperations;
};

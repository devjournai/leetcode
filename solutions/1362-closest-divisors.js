/**
 * Closest Divisors
 * Intuition: We need a factor pair of either num+1 or num+2 whose two factors are as close as possible. Scanning divisors up to sqrt(x) finds the tightest pair for each candidate.
 * Approach: 1. Factor num+1 and num+2 separately by iterating d from 1 to sqrt(x) and keeping the pair (d, x/d) with the smallest |x/d - d|. 2. Compare the two best pairs and return the one with the smaller absolute difference.
 * Dry Run: num = 8.
 *   - 9: best pair (3, 3), diff 0.
 *   - 10: best pair (2, 5), diff 3.
 *   - Return [3, 3].
 * Time Complexity: O(sqrt(num))
 * Space Complexity: O(1)
 */
var closestDivisors = function (num) {
  const firstTargetOperand = num + 1;
  const secondTargetOperand = num + 2;

  const firstPairCandidate = findOptimalFactors(firstTargetOperand);
  const secondPairCandidate = findOptimalFactors(secondTargetOperand);

  const diffFirst = Math.abs(firstPairCandidate[0] - firstPairCandidate[1]);
  const diffSecond = Math.abs(secondPairCandidate[0] - secondPairCandidate[1]);

  return diffFirst <= diffSecond ? firstPairCandidate : secondPairCandidate;
};

function findOptimalFactors(numberToFactorize) {
  let minimumDifferenceTracker = Infinity;
  let currentBestFactorSet = [];

  const iterationUpperLimit = Math.floor(Math.sqrt(numberToFactorize));

  for (
    let currentIterationDivisor = 1;
    currentIterationDivisor <= iterationUpperLimit;
    currentIterationDivisor++
  ) {
    if (numberToFactorize % currentIterationDivisor === 0) {
      const correspondingDivisor = numberToFactorize / currentIterationDivisor;
      const computedAbsoluteDifference = Math.abs(
        correspondingDivisor - currentIterationDivisor
      );

      if (computedAbsoluteDifference < minimumDifferenceTracker) {
        minimumDifferenceTracker = computedAbsoluteDifference;
        currentBestFactorSet = [currentIterationDivisor, correspondingDivisor];
      }
    }
  }

  return currentBestFactorSet;
}

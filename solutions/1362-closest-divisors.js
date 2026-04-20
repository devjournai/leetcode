/**
 * Closest Divisors
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
        correspondingDivisor - currentIterationDivisor,
      );

      if (computedAbsoluteDifference < minimumDifferenceTracker) {
        minimumDifferenceTracker = computedAbsoluteDifference;
        currentBestFactorSet = [currentIterationDivisor, correspondingDivisor];
      }
    }
  }

  return currentBestFactorSet;
}

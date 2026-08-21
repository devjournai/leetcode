/**
 * Preimage Size Of Factorial Zeroes Function
 * Intuition: Trailing zeros of `x!` jump in plateaus; the count of `x` with exactly `k` zeros is the gap between the first `x` with ≥`k` zeros and the first with >`k` zeros.
 * Approach: 1. `calculateFactorialTrailingZeroes` sums `floor(x/5)+floor(x/25)+…`. 2. Binary search `[0, 5e9]` for min `x` with zeros ≥ `k`. 3. Search for min `x` with zeros > `k`. 4. Return their difference (0 if `k` is skipped).
 * Dry Run: k = 0. Lower bound is 0 (0! has 0 zeros). First x with zeros > 0 is 5. Return 5 (x = 0..4).
 * Time Complexity: O(log(MAX_X_VALUE) * log_5(MAX_X_VALUE))
 * Space Complexity: O(1)
 */
var preimageSizeFZF = function (k) {
  const calculateFactorialTrailingZeroes = (inputNumber) => {
    let currentZeroCount = 0;
    let factorIncrement = 5;
    while (inputNumber >= factorIncrement) {
      currentZeroCount += Math.floor(inputNumber / factorIncrement);
      if (factorIncrement > Number.MAX_SAFE_INTEGER / 5) {
        break;
      }
      factorIncrement *= 5;
    }
    return currentZeroCount;
  };

  const binarySearchLimit = 5_000_000_000;

  const findMinimumXForTargetK = (targetValueK) => {
    let leftBoundary = 0;
    let rightBoundary = binarySearchLimit;
    let foundCandidate = binarySearchLimit;

    while (leftBoundary <= rightBoundary) {
      let middleIndex = Math.floor(
        leftBoundary + (rightBoundary - leftBoundary) / 2
      );
      let evaluatedZeroesCount = calculateFactorialTrailingZeroes(middleIndex);

      if (evaluatedZeroesCount >= targetValueK) {
        foundCandidate = middleIndex;
        rightBoundary = middleIndex - 1;
      } else {
        leftBoundary = middleIndex + 1;
      }
    }
    return foundCandidate;
  };

  const findMinimumXExceedingK = (desiredZeroesK) => {
    let lowIndex = 0;
    let highIndex = binarySearchLimit;

    while (lowIndex < highIndex) {
      let midSearchIndex = Math.floor((lowIndex + highIndex) / 2);
      let computedTrailingZeroes =
        calculateFactorialTrailingZeroes(midSearchIndex);

      if (computedTrailingZeroes <= desiredZeroesK) {
        lowIndex = midSearchIndex + 1;
      } else {
        highIndex = midSearchIndex;
      }
    }
    return lowIndex;
  };

  let lowerBoundResult = findMinimumXForTargetK(k);
  let upperBoundResult = findMinimumXExceedingK(k);

  return upperBoundResult - lowerBoundResult;
};

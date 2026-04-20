/**
 * Preimage Size Of Factorial Zeroes Function
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
        leftBoundary + (rightBoundary - leftBoundary) / 2,
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

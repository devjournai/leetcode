/**
 * Best Sightseeing Pair
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxScoreSightseeingPair = function (values) {
  let currentMaximumScore = Number.MIN_SAFE_INTEGER;
  let maxValPlusCurrentIndex = values[0];

  for (
    let iterateSecondPointer = 1;
    iterateSecondPointer < values.length;
    iterateSecondPointer++
  ) {
    let scoreCandidate =
      maxValPlusCurrentIndex +
      values[iterateSecondPointer] -
      iterateSecondPointer;
    currentMaximumScore = Math.max(currentMaximumScore, scoreCandidate);
    maxValPlusCurrentIndex = Math.max(
      maxValPlusCurrentIndex,
      values[iterateSecondPointer] + iterateSecondPointer,
    );
  }

  return currentMaximumScore;
};

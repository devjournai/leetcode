/**
 * Best Sightseeing Pair
 * Intuition: Score is values[i]+values[j]+i-j for i<j. Keep the best values[i]+i seen so far and pair it with each j using values[j]-j.
 * Approach: 1. Initialize maxValPlusIndex = values[0]. 2. For each j>=1, update answer with maxValPlusIndex + values[j] - j. 3. Then update maxValPlusIndex with values[j]+j.
 * Dry Run: values = [8,1,5,2,6].
 *   - j=1: 8+1-1=8. Track max(8,1+1)=8. j=2: 8+5-2=11. j=4: 8+6-4=10. Best 11.
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
      values[iterateSecondPointer] + iterateSecondPointer
    );
  }

  return currentMaximumScore;
};

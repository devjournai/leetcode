/**
 * Split Array Largest Sum
 * Time Complexity: O(N * log(S))
 * Space Complexity: O(1)
*/
var splitArray = function (nums, k) {
  let minimumPossibleLargestSum = 0;
  let maximumPossibleLargestSum = 0;

  for (let numberEntry of nums) {
    minimumPossibleLargestSum = Math.max(minimumPossibleLargestSum, numberEntry);
    maximumPossibleLargestSum += numberEntry;
  }

  let resultLargestSum = maximumPossibleLargestSum;
  let currentLowerBound = minimumPossibleLargestSum;
  let currentUpperBound = maximumPossibleLargestSum;

  while (currentLowerBound <= currentUpperBound) {
    const candidateLargestSum = Math.floor((currentLowerBound + currentUpperBound) / 2);

    const canAchieveSplit = (function (attemptedSumLimit, requiredSplits, sourceArrayValues) {
      let segmentsFormed = 1;
      let currentSegmentTotal = 0;

      for (let elementIndex = 0; elementIndex < sourceArrayValues.length; elementIndex++) {
        const iteratedElementValue = sourceArrayValues[elementIndex];

        if (currentSegmentTotal + iteratedElementValue <= attemptedSumLimit) {
          currentSegmentTotal += iteratedElementValue;
        } else {
          segmentsFormed++;
          currentSegmentTotal = iteratedElementValue;
        }
      }
      return segmentsFormed <= requiredSplits;
    })(candidateLargestSum, k, nums);

    if (canAchieveSplit) {
      resultLargestSum = candidateLargestSum;
      currentUpperBound = candidateLargestSum - 1;
    } else {
      currentLowerBound = candidateLargestSum + 1;
    }
  }

  return resultLargestSum;
};
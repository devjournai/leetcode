/**
 * Maximum Average Subarray II
 * Time Complexity: O(N log(MAX_VAL - MIN_VAL / PRECISION))
 * Space Complexity: O(1)
 */
var findMaxAverage = function (nums, k) {
  const numLength = nums.length;
  let lowerBound = Number.MAX_VALUE;
  let upperBound = Number.MIN_VALUE;

  for (
    let currentNumIndex = 0;
    currentNumIndex < numLength;
    ++currentNumIndex
  ) {
    if (nums[currentNumIndex] < lowerBound) {
      lowerBound = nums[currentNumIndex];
    }
    if (nums[currentNumIndex] > upperBound) {
      upperBound = nums[currentNumIndex];
    }
  }

  let maximumAverage = lowerBound;
  const precisionThreshold = 1e-5;

  while (upperBound - lowerBound > precisionThreshold) {
    const midPointAverage = (lowerBound + upperBound) / 2;
    if (canFindSubarrayWithAverage(nums, k, midPointAverage)) {
      maximumAverage = midPointAverage;
      lowerBound = midPointAverage;
    } else {
      upperBound = midPointAverage;
    }
  }

  return maximumAverage;
};

function canFindSubarrayWithAverage(inputValues, minimumLength, targetAverage) {
  const totalSize = inputValues.length;
  let windowTransformedSum = 0;

  for (let indexPosition = 0; indexPosition < minimumLength; ++indexPosition) {
    windowTransformedSum += inputValues[indexPosition] - targetAverage;
  }

  if (windowTransformedSum >= 0) {
    return true;
  }

  let pastWindowTransformedSum = 0;
  let globalMinimumPastSum = 0;

  for (
    let iterateIndex = minimumLength;
    iterateIndex < totalSize;
    ++iterateIndex
  ) {
    windowTransformedSum += inputValues[iterateIndex] - targetAverage;
    pastWindowTransformedSum +=
      inputValues[iterateIndex - minimumLength] - targetAverage;
    globalMinimumPastSum = Math.min(
      globalMinimumPastSum,
      pastWindowTransformedSum,
    );

    if (windowTransformedSum - globalMinimumPastSum >= 0) {
      return true;
    }
  }

  return false;
}

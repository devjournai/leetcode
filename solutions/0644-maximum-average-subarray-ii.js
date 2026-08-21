/**
 * Maximum Average Subarray II
 * Intuition: Binary-search the average. A subarray of length ≥ k has average ≥ mid iff some window of transformed values (nums[i]-mid) has a non-negative prefix after subtracting the min prefix of the dropped prefix.
 * Approach: 1. Bound search by min/max of nums. 2. While `upperBound - lowerBound > 1e-5`, test `canFindSubarrayWithAverage`. 3. Helper sums first k transformed values; then slides, tracking `globalMinimumPastSum` of the prefix before the window. 4. Raise lower bound on success.
 * Dry Run: nums=[1,12,-5,-6,50,3], k=4. Search between -6 and 50; mid averages that pass keep rising until ~12.75 (the length-4 window summing to 51).
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
      pastWindowTransformedSum
    );

    if (windowTransformedSum - globalMinimumPastSum >= 0) {
      return true;
    }
  }

  return false;
}

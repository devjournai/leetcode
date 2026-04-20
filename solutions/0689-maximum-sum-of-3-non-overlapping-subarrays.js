/**
 * Maximum Sum Of 3 Non Overlapping Subarrays
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxSumOfThreeSubarrays = function (nums, k) {
  const arrayLength = nums.length;

  let currentSumOne = 0;
  let currentSumTwo = 0;
  let currentSumThree = 0;

  let maximumSumOne = 0;
  let indexOneMax = 0;

  let maximumSumOneAndTwo = 0;
  let indexOneMaxBest = 0;
  let indexTwoMaxBest = 0;

  let maximumOverallSum = 0;
  let finalIndices = [];

  for (let elementIndex = 0; elementIndex < k; elementIndex++) {
    currentSumOne += nums[elementIndex];
    currentSumTwo += nums[elementIndex + k];
    currentSumThree += nums[elementIndex + 2 * k];
  }

  maximumSumOne = currentSumOne;
  indexOneMax = 0;

  maximumSumOneAndTwo = currentSumOne + currentSumTwo;
  indexOneMaxBest = 0;
  indexTwoMaxBest = k;

  maximumOverallSum = currentSumOne + currentSumTwo + currentSumThree;
  finalIndices = [0, k, 2 * k];

  for (
    let currentStart = 1;
    currentStart <= arrayLength - 3 * k;
    currentStart++
  ) {
    currentSumOne += nums[currentStart + k - 1] - nums[currentStart - 1];
    currentSumTwo +=
      nums[currentStart + 2 * k - 1] - nums[currentStart + k - 1];
    currentSumThree +=
      nums[currentStart + 3 * k - 1] - nums[currentStart + 2 * k - 1];

    if (currentSumOne > maximumSumOne) {
      maximumSumOne = currentSumOne;
      indexOneMax = currentStart;
    }

    if (maximumSumOne + currentSumTwo > maximumSumOneAndTwo) {
      maximumSumOneAndTwo = maximumSumOne + currentSumTwo;
      indexOneMaxBest = indexOneMax;
      indexTwoMaxBest = currentStart + k;
    }

    if (maximumSumOneAndTwo + currentSumThree > maximumOverallSum) {
      maximumOverallSum = maximumSumOneAndTwo + currentSumThree;
      finalIndices[0] = indexOneMaxBest;
      finalIndices[1] = indexTwoMaxBest;
      finalIndices[2] = currentStart + 2 * k;
    }
  }

  return finalIndices;
};

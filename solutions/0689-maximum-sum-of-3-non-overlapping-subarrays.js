/**
 * Maximum Sum Of 3 Non Overlapping Subarrays
 * Intuition: Slide three adjacent windows of length k. Keep the best first window, the best pair (first+second), and the best triple; lexicographically earliest indices win because updates use strict `>`.
 * Approach: 1. Seed `currentSumOne/Two/Three` on [0,k), [k,2k), [2k,3k). 2. For `currentStart` from 1 to n-3k, slide each window. 3. Update `maximumSumOne`/`indexOneMax`, then pair using that best first plus current second, then triple using best pair plus current third into `finalIndices`.
 * Dry Run: nums=[1,2,1,2,6,7,5,1], k=2. Seed windows sums 3,3,13 at indices [0,2,4]. Sliding updates the best first/pair/triple; finalIndices=[0,3,5] (sums 3+8+12).
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

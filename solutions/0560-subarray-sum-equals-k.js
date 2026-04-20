/**
 * Subarray Sum Equals K
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var subarraySum = function (nums, k) {
  const prefixSumFrequencies = new Map();
  prefixSumFrequencies.set(0, 1);

  let totalSubarrays = 0;
  let currentRunningSum = 0;

  for (let elementIndex = 0; elementIndex < nums.length; elementIndex++) {
    const numberValue = nums[elementIndex];
    currentRunningSum += numberValue;

    const sumToFind = currentRunningSum - k;
    const frequencyOfSumToFind = prefixSumFrequencies.get(sumToFind) || 0;
    totalSubarrays += frequencyOfSumToFind;

    const existingFrequencyOfCurrentSum =
      prefixSumFrequencies.get(currentRunningSum) || 0;
    const newFrequencyForCurrentSum = existingFrequencyOfCurrentSum + 1;
    prefixSumFrequencies.set(currentRunningSum, newFrequencyForCurrentSum);
  }

  return totalSubarrays;
};

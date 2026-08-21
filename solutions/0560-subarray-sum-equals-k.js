/**
 * Subarray Sum Equals K
 * Intuition: A subarray ending at i sums to k iff some earlier prefix equals `runningSum - k`. Count those prefixes with a frequency map (include prefix 0 once).
 * Approach: 1. Map prefix→count, seed 0→1. 2. Scan nums, add to `currentRunningSum`. 3. Add map[sum-k] to the answer. 4. Increment map[currentRunningSum]. 5. Return the total.
 * Dry Run: nums = [1,1,1], k = 2.
 *   - After 1: look for -1 (0), prefix 1→1.
 *   - After 2: look for 0 (1 subarray); after 3: look for 1 (2 subarrays). Total 2.
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

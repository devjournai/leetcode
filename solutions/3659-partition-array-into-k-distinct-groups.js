/**
 * Partition Array Into K-Distinct Groups
 * Intuition: n must split into n / k groups of size k. The most frequent value can appear in at most one slot per group, so its count cannot exceed the number of groups.
 * Approach: 1. If n is not divisible by k, return false. 2. Let groupCount = n / k. 3. Count frequencies; if any value appears more than groupCount times, return false. 4. Otherwise a partition exists.
 * Dry Run: nums = [3, 5, 2, 2], k = 2. n / k = 2 groups. Max frequency is 2 (the 2s), which equals the group count, so true. nums = [1, 5, 2, 3], k = 3: n is not divisible by 3, false.
 * Time Complexity: O(N)
 * Space Complexity: O(M) where M is the maximum value
 */
var partitionArray = function (nums, k) {
  const n = nums.length;
  if (n % k !== 0) {
    return false;
  }

  const groupCount = n / k;
  const maxValue = Math.max(...nums);
  const frequency = new Array(maxValue + 1).fill(0);

  for (const value of nums) {
    frequency[value]++;
    if (frequency[value] > groupCount) {
      return false;
    }
  }

  return true;
};

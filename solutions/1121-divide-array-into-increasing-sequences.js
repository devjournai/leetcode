/**
 * Divide Array Into Increasing Sequences
 * Intuition: Because nums is non-decreasing, equal values are consecutive. Each copy of the most frequent value must go into a different strictly increasing subsequence, so that frequency is the minimum number of subsequences. Each subsequence needs at least k elements, which is possible iff k times that frequency is at most n.
 * Approach: 1. Scan nums once, tracking the current run of equal values and the global max frequency. 2. Return whether k * maxFrequency <= nums.length.
 * Dry Run: nums = [1,2,2,3,3,4], k = 3.
 *   - Runs: 1 once, 2 twice, 3 twice, 4 once; maxFrequency = 2.
 *   - 3 * 2 = 6 <= 6, so true (two subsequences of length 3).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canDivideIntoSubsequences = function (nums, k) {
  let maximumElementFrequency = 1;
  let consecutiveElementCount = 1;
  let arrayLength = nums.length;

  for (let arrayIndex = 1; arrayIndex < arrayLength; arrayIndex++) {
    if (nums[arrayIndex] === nums[arrayIndex - 1]) {
      consecutiveElementCount++;
    } else {
      consecutiveElementCount = 1;
    }
    maximumElementFrequency = Math.max(
      maximumElementFrequency,
      consecutiveElementCount
    );
  }

  return k * maximumElementFrequency <= arrayLength;
};

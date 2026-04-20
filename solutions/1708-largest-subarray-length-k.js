/**
 * Largest Subarray Length K
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
var largestSubarray = function (nums, k) {
  let startingIndexOfLargest = 0;

  let lastPossibleStartIndex = nums.length - k;

  for (
    let currentCandidateIndex = 1;
    currentCandidateIndex <= lastPossibleStartIndex;
    currentCandidateIndex++
  ) {
    if (nums[currentCandidateIndex] > nums[startingIndexOfLargest]) {
      startingIndexOfLargest = currentCandidateIndex;
    }
  }

  return nums.slice(startingIndexOfLargest, startingIndexOfLargest + k);
};

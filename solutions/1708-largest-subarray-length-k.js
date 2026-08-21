/**
 * Largest Subarray Length K
 * Intuition: Among windows of length `k`, this implementation picks the window whose first element is strictly largest (leftmost on ties) and slices that range.
 * Approach: 1. `lastPossibleStartIndex = n-k`. 2. Scan starts 1..last; if `nums[currentCandidateIndex] > nums[startingIndexOfLargest]`, update. 3. Return `nums.slice(start, start+k)`.
 * Dry Run: nums = [1,4,5,2,3], k = 3
 * starts 0,1,2 with firsts 1,4,5 → start 2 → [5,2,3].
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

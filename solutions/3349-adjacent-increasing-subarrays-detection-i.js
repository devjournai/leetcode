/**
 * Adjacent Increasing Subarrays Detection I
 * Intuition: Track the current strictly-increasing run and the previous run. Two adjacent windows of length k exist if the current run is at least 2k, or both neighboring runs are at least k.
 * Approach: Walk the array. When nums[i] > nums[i-1], grow increasing; else prevIncreasing = increasing, increasing = 1. Return true if increasing/2 >= k or min(prev, current) >= k.
 * Dry Run: nums = [1,2,3,4,4,5,6], k = 3. Run of 4, then run of 3. min(4,3) >= 3, true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var hasIncreasingSubarrays = function (nums, k) {
  let increasing = 1;
  let prevIncreasing = 0;

  for (let index = 1; index < nums.length; index++) {
    if (nums[index] > nums[index - 1]) {
      increasing++;
    } else {
      prevIncreasing = increasing;
      increasing = 1;
    }
    if (
      Math.floor(increasing / 2) >= k ||
      Math.min(prevIncreasing, increasing) >= k
    ) {
      return true;
    }
  }

  return false;
};

/**
 * Search In Rotated Sorted Array II
 * Intuition: Binary search still works on a rotated sorted array, but duplicates can make nums[lo] == nums[mid] == nums[hi], which hides which half is sorted—shrink both ends in that case.
 * Approach: 1. While lo ≤ hi, if mid equals target return true. 2. If lo, mid, and hi are equal, increment lo and decrement hi. 3. If the left half [lo, mid] is sorted, search it when target is in that range else go right; otherwise do the symmetric check on the right half.
 * Dry Run: nums=[2,5,6,0,0,1,2], target=0 → left of mid may be unsorted; after narrowing the right half [0,0,1,2] contains 0 → true
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var search = function (nums, target) {
  let startBoundary = 0;
  let endBoundary = nums.length - 1;

  while (startBoundary <= endBoundary) {
    let currentMiddle =
      startBoundary + Math.floor((endBoundary - startBoundary) / 2);

    if (nums[currentMiddle] === target) {
      return true;
    }

    if (
      nums[startBoundary] === nums[currentMiddle] &&
      nums[currentMiddle] === nums[endBoundary]
    ) {
      startBoundary++;
      endBoundary--;
      continue;
    }

    if (nums[startBoundary] <= nums[currentMiddle]) {
      if (nums[startBoundary] <= target && target < nums[currentMiddle]) {
        endBoundary = currentMiddle - 1;
      } else {
        startBoundary = currentMiddle + 1;
      }
    } else {
      if (nums[currentMiddle] < target && target <= nums[endBoundary]) {
        startBoundary = currentMiddle + 1;
      } else {
        endBoundary = currentMiddle - 1;
      }
    }
  }

  return false;
};

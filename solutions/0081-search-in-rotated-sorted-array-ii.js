/**
 * Search In Rotated Sorted Array II
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

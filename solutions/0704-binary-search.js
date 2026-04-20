/**
 * Binary Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var search = function (nums, target) {
  let lowerBound = 0;
  let upperBound = nums.length - 1;

  for (; upperBound >= lowerBound; ) {
    const currentMidIndex = Math.floor((lowerBound + upperBound) / 2);
    const valueAtMid = nums[currentMidIndex];

    if (target === valueAtMid) {
      return currentMidIndex;
    }

    if (target < valueAtMid) {
      upperBound = currentMidIndex - 1;
    }
    if (target > valueAtMid) {
      lowerBound = currentMidIndex + 1;
    }
  }

  return -1;
};

/**
 * Single Element In A Sorted Array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var singleNonDuplicate = function (nums) {
  let startSearchIndex = 0;
  let endSearchIndex = nums.length - 1;

  while (startSearchIndex < endSearchIndex) {
    let midPoint =
      startSearchIndex + Math.floor((endSearchIndex - startSearchIndex) / 2);

    if (midPoint % 2 === 0) {
      if (nums[midPoint] === nums[midPoint + 1]) {
        startSearchIndex = midPoint + 2;
      } else {
        endSearchIndex = midPoint;
      }
    } else {
      if (nums[midPoint] === nums[midPoint - 1]) {
        startSearchIndex = midPoint + 1;
      } else {
        endSearchIndex = midPoint;
      }
    }
  }

  return nums[startSearchIndex];
};

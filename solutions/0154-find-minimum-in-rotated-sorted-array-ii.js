/**
 * Find Minimum In Rotated Sorted Array II
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
 */
var findMin = function (nums) {
  let startIndex = 0;
  let endIndex = nums.length - 1;

  while (startIndex < endIndex) {
    let middleIndex = Math.floor(startIndex + (endIndex - startIndex) / 2);

    if (nums[middleIndex] < nums[endIndex]) {
      endIndex = middleIndex;
    } else if (nums[middleIndex] > nums[endIndex]) {
      startIndex = middleIndex + 1;
    } else {
      endIndex--;
    }
  }

  return nums[startIndex];
};

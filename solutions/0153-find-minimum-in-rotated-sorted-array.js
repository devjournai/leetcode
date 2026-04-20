/**
 * Find Minimum In Rotated Sorted Array
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
*/
var findMin = function (nums) {
  let startPointer = 0;
  let endPointer = nums.length - 1;

  while (startPointer < endPointer) {
    let middleIndex = Math.floor(startPointer + (endPointer - startPointer) / 2);

    if (nums[middleIndex] > nums[endPointer]) {
      startPointer = middleIndex + 1;
    } else {
      endPointer = middleIndex;
    }
  }

  return nums[startPointer];
};
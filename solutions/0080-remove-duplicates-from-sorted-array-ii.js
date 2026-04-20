/**
 * Remove Duplicates From Sorted Array II
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var removeDuplicates = function (nums) {
  const totalLength = nums.length;

  if (totalLength <= 2) {
    return totalLength;
  }

  let nextWritePosition = 2;
  let currentReadPosition = 2;

  while (currentReadPosition < totalLength) {
    if (nums[currentReadPosition] !== nums[nextWritePosition - 2]) {
      nums[nextWritePosition] = nums[currentReadPosition];
      nextWritePosition++;
    }
    currentReadPosition++;
  }

  return nextWritePosition;
};

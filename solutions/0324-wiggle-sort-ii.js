/**
 * Wiggle Sort II
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var wiggleSort = function (nums) {
  nums.sort((valueA, valueB) => valueA - valueB);

  const originalArrayLength = nums.length;
  const auxiliarySortedArray = [...nums];

  const medianSplitIndex = Math.floor((originalArrayLength - 1) / 2);

  let currentSmallHalfPointer = medianSplitIndex;
  let currentLargeHalfPointer = originalArrayLength - 1;

  for (let targetIndex = 0; targetIndex < originalArrayLength; targetIndex++) {
    if (targetIndex % 2 === 0) {
      nums[targetIndex] = auxiliarySortedArray[currentSmallHalfPointer];
      currentSmallHalfPointer--;
    } else {
      nums[targetIndex] = auxiliarySortedArray[currentLargeHalfPointer];
      currentLargeHalfPointer--;
    }
  }
};

/**
 * Valid Triangle Number
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */
var triangleNumber = function (nums) {
  let finalTriangleCount = 0;
  const numItems = nums.length;

  if (numItems < 3) {
    return 0;
  }

  nums.sort((firstValue, secondValue) => firstValue - secondValue);

  for (
    let currentOuterIndex = 0;
    currentOuterIndex < numItems - 2;
    currentOuterIndex++
  ) {
    if (nums[currentOuterIndex] === 0) {
      continue;
    }

    let thirdPointer = currentOuterIndex + 2;
    for (
      let currentMiddleIndex = currentOuterIndex + 1;
      currentMiddleIndex < numItems - 1;
      currentMiddleIndex++
    ) {
      thirdPointer = Math.max(thirdPointer, currentMiddleIndex + 1);

      while (
        thirdPointer < numItems &&
        nums[currentOuterIndex] + nums[currentMiddleIndex] > nums[thirdPointer]
      ) {
        thirdPointer++;
      }
      finalTriangleCount += thirdPointer - 1 - currentMiddleIndex;
    }
  }

  return finalTriangleCount;
};

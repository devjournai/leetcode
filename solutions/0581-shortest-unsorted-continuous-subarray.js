/**
 * Shortest Unsorted Continuous Subarray
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findUnsortedSubarray = function (nums) {
  const arrayLength = nums.length;

  if (arrayLength <= 1) {
    return 0;
  }

  let currentMaximum = nums[0];
  let rightmostMisplaced = -1;

  for (let advancePointer = 1; advancePointer < arrayLength; ++advancePointer) {
    if (nums[advancePointer] < currentMaximum) {
      rightmostMisplaced = advancePointer;
    } else {
      currentMaximum = nums[advancePointer];
    }
  }

  let currentMinimum = nums[arrayLength - 1];
  let leftmostMisplaced = arrayLength;

  for (
    let retreatPointer = arrayLength - 2;
    retreatPointer >= 0;
    --retreatPointer
  ) {
    if (nums[retreatPointer] > currentMinimum) {
      leftmostMisplaced = retreatPointer;
    } else {
      currentMinimum = nums[retreatPointer];
    }
  }

  if (rightmostMisplaced === -1) {
    return 0;
  }

  return rightmostMisplaced - leftmostMisplaced + 1;
};

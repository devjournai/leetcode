/**
 * Minimum Operations To Make The Array Increasing
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minOperations = function (nums) {
  let totalOperationsCount = 0;
  let lastStrictlyIncreasingValue = nums[0];
  let arrayLength = nums.length;

  for (
    let currentElementIndex = 1;
    currentElementIndex < arrayLength;
    currentElementIndex++
  ) {
    let currentElementValue = nums[currentElementIndex];

    if (currentElementValue <= lastStrictlyIncreasingValue) {
      let targetValueForCurrent = lastStrictlyIncreasingValue + 1;
      totalOperationsCount += targetValueForCurrent - currentElementValue;
      lastStrictlyIncreasingValue = targetValueForCurrent;
    } else {
      lastStrictlyIncreasingValue = currentElementValue;
    }
  }

  return totalOperationsCount;
};

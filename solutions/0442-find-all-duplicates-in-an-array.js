/**
 * Find All Duplicates In An Array
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var findDuplicates = function (nums) {
  const duplicateNumbers = [];
  const arrayLength = nums.length;

  for (let loopIndex = 0; loopIndex < arrayLength; loopIndex++) {
    const currentElementValue = nums[loopIndex];
    const targetAbsoluteIndex = Math.abs(currentElementValue) - 1;
    const valueAtIndex = nums[targetAbsoluteIndex];

    if (valueAtIndex < 0) {
      duplicateNumbers.push(Math.abs(currentElementValue));
    } else {
      nums[targetAbsoluteIndex] *= -1;
    }
  }

  return duplicateNumbers;
};
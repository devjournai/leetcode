/**
 * Missing Number
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var missingNumber = function (nums) {
  const collectionLength = nums.length;
  const idealTotalSum = (collectionLength * (collectionLength + 1)) / 2;
  let currentElementsSum = 0;

  for (let elementIndex = 0; elementIndex < collectionLength; elementIndex++) {
    currentElementsSum += nums[elementIndex];
  }

  const resultValue = idealTotalSum - currentElementsSum;
  return resultValue;
};
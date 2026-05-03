/**
 * Minimize Product Sum Of Two Arrays
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minProductSum = function (nums1, nums2) {
  nums1.sort((paramA, paramB) => paramA - paramB);
  nums2.sort((paramC, paramD) => paramD - paramC);

  let currentTotal = 0;
  const arraySize = nums1.length;

  for (let iterIndex = 0; iterIndex < arraySize; iterIndex++) {
    const num1Value = nums1[iterIndex];
    const num2Value = nums2[iterIndex];
    currentTotal += num1Value * num2Value;
  }

  return currentTotal;
};

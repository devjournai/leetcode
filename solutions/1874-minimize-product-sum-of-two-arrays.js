/**
 * Minimize Product Sum Of Two Arrays
 * Intuition: Pair smallest of one array with largest of the other (rearrangement inequality).
 * Approach: 1. Sort `nums1` ascending and `nums2` descending. 2. Sum nums1[i]*nums2[i].
 * Dry Run: nums1=[5,3,4,2], nums2=[4,2,2,5] after sorts 2,3,4,5 and 5,4,2,2 → 10+12+8+10=40.
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

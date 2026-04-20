/**
 * Get The Maximum Score
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
var maxSum = function (nums1, nums2) {
  const moduloConstant = 10 ** 9 + 7;
  const sizeOne = nums1.length;
  const sizeTwo = nums2.length;

  let pointerOne = 0;
  let pointerTwo = 0;

  let currentSumOne = 0;
  let currentSumTwo = 0;

  while (pointerOne < sizeOne && pointerTwo < sizeTwo) {
    if (nums1[pointerOne] < nums2[pointerTwo]) {
      currentSumOne += nums1[pointerOne];
      pointerOne++;
    } else if (nums1[pointerOne] > nums2[pointerTwo]) {
      currentSumTwo += nums2[pointerTwo];
      pointerTwo++;
    } else {
      const mergedValue =
        Math.max(currentSumOne, currentSumTwo) + nums1[pointerOne];
      currentSumOne = mergedValue;
      currentSumTwo = mergedValue;
      pointerOne++;
      pointerTwo++;
    }
  }

  while (pointerOne < sizeOne) {
    currentSumOne += nums1[pointerOne];
    pointerOne++;
  }

  while (pointerTwo < sizeTwo) {
    currentSumTwo += nums2[pointerTwo];
    pointerTwo++;
  }

  const finalMaximum = Math.max(currentSumOne, currentSumTwo);

  return finalMaximum % moduloConstant;
};

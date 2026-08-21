/**
 * Get The Maximum Score
 * Intuition: Shared values are portals. Track two path sums and at each common number take max(sum1,sum2)+that value.
 * Approach: 1. Two pointers. 2. Advance the smaller, adding to its sum. 3. On equal, both sums = max+value. 4. Drain tails; return max % (1e9+7).
 * Dry Run: nums1 = [2,4,5,8,10], nums2 = [4,6,8,9].
 *   - Paths meet at 4 and 8; max score 30.
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

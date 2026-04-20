/**
 * Maximum Distance Between a Pair of Values
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var maxDistance = function (nums1, nums2) {
  let maximumDistanceValue = 0;
  let pointerOne = 0;
  let pointerTwo = 0;

  while (pointerOne < nums1.length && pointerTwo < nums2.length) {
    if (nums1[pointerOne] > nums2[pointerTwo]) {
      pointerOne++;
    } else {
      maximumDistanceValue = Math.max(
        maximumDistanceValue,
        pointerTwo - pointerOne,
      );
      pointerTwo++;
    }
  }

  return maximumDistanceValue;
};

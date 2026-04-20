/**
 * Merge Sorted Array
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
var merge = function (nums1, m, nums2, n) {
  let writePosition = m + n - 1;
  let pointerOne = m - 1;
  let pointerTwo = n - 1;

  while (pointerTwo >= 0) {
    if (pointerOne < 0 || nums2[pointerTwo] > nums1[pointerOne]) {
      nums1[writePosition] = nums2[pointerTwo];
      pointerTwo--;
    } else {
      nums1[writePosition] = nums1[pointerOne];
      pointerOne--;
    }
    writePosition--;
  }
};
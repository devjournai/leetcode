/**
 * Merge Sorted Array
 * Intuition: nums1 has trailing unused slots, so merge from the back: always write the larger of nums1[m-1] and nums2[n-1] into the current end so we never overwrite unread nums1 values.
 * Approach: 1. write = m+n-1, i = m-1, j = n-1. 2. While j ≥ 0, if i < 0 or nums2[j] > nums1[i], write nums2[j] and j--; else write nums1[i] and i--. 3. Remaining nums1 prefix is already in place.
 * Dry Run: nums1=[1,2,3,0,0,0], m=3, nums2=[2,5,6] → write 6,5, then 3,2,2,1 → [1,2,2,3,5,6]
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

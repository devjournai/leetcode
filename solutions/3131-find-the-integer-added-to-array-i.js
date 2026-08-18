/**
 * Find The Integer Added To Array I
 * Intuition: Every element of nums2 is nums1[i] plus the same hidden integer x, so x equals min(nums2) - min(nums1).
 * Approach: 1. Find the minimum of nums1. 2. Find the minimum of nums2. 3. Return their difference.
 * Dry Run:
 *   nums1 = [2, 6, 4], nums2 = [9, 7, 5]
 *   min1 = 2, min2 = 5, x = 3
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var addedInteger = function (nums1, nums2) {
  return Math.min(...nums2) - Math.min(...nums1);
};

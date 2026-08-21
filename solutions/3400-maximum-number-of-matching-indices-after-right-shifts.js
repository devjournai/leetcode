/**
 * Maximum Number of Matching Indices After Right Shifts
 * Intuition: A right shift of `nums1` by `s` matches index `i` when `nums1[(i + s) % n] === nums2[i]`. Try every shift and keep the best match count.
 * Approach: 1. For each shift in 0..n-1, count equal pairs. 2. Return the maximum count.
 * Dry Run: nums1 = [1,2,3], nums2 = [2,3,1]. Shift 1: 2,3,1 matches all 3.
 * Time Complexity: O(N^2)
 * Space Complexity: O(1)
 */

var maximumMatchingIndices = function (nums1, nums2) {
  const n = nums1.length;
  let maximumMatches = 0;

  for (let shiftAmount = 0; shiftAmount < n; shiftAmount++) {
    let matchCount = 0;
    for (let index = 0; index < n; index++) {
      if (nums1[(index + shiftAmount) % n] === nums2[index]) {
        matchCount++;
      }
    }
    maximumMatches = Math.max(maximumMatches, matchCount);
  }

  return maximumMatches;
};

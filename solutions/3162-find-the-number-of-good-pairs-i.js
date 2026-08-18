/**
 * Find The Number Of Good Pairs I
 * Intuition: A pair (i, j) is good when nums1[i] is divisible by nums2[j] * k.
 * Approach: 1. Nested loop over both arrays. 2. Increment when nums1[i] % (nums2[j] * k) === 0. 3. Return the count.
 * Dry Run:
 *   nums1 = [1,3,4], nums2 = [1,3,4], k = 1
 *   Valid pairs: (0,0),(1,0),(1,1),(2,0),(2,2) = 5
 * Time Complexity: O(N * M)
 * Space Complexity: O(1)
 */
var numberOfPairs = function (nums1, nums2, k) {
  let goodPairCount = 0;
  for (const leftValue of nums1) {
    for (const rightValue of nums2) {
      if (leftValue % (rightValue * k) === 0) {
        goodPairCount++;
      }
    }
  }
  return goodPairCount;
};

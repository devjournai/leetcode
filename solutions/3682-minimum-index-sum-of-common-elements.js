/**
 * Minimum Index Sum Of Common Elements
 * Intuition: For each value, the cheapest pairing uses its first index in nums2 plus any matching index in nums1. Track first occurrences in nums2, then scan nums1.
 * Approach: 1. Map each nums2 value to its earliest index. 2. For each nums1[i] in the map, minimize i + firstIndex. 3. Return -1 if none.
 * Dry Run: nums1 = [1, 2, 3], nums2 first indices of those values; the minimum index sum among shared values is the answer.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumSum = function (nums1, nums2) {
  const firstIndexInNums2 = new Map();
  for (let index = 0; index < nums2.length; index++) {
    if (!firstIndexInNums2.has(nums2[index])) {
      firstIndexInNums2.set(nums2[index], index);
    }
  }

  let minIndexSum = Infinity;
  for (let index = 0; index < nums1.length; index++) {
    if (firstIndexInNums2.has(nums1[index])) {
      minIndexSum = Math.min(
        minIndexSum,
        index + firstIndexInNums2.get(nums1[index])
      );
    }
  }
  return minIndexSum === Infinity ? -1 : minIndexSum;
};

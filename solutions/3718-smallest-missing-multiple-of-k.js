/**
 * Smallest Missing Multiple Of K
 * Intuition: The missing multiple is the first k, 2k, 3k, ... not present in nums.
 * Approach: Put nums in a set, then try i = 1, 2, 3, ... until k*i is absent.
 * Dry Run: nums missing 2k when k is present yields 2k.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var missingMultiple = function (nums, k) {
  const present = new Set(nums);
  for (let factor = 1; ; factor++) {
    const multiple = k * factor;
    if (!present.has(multiple)) {
      return multiple;
    }
  }
};

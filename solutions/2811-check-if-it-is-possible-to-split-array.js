/**
 * Check if it is Possible to Split Array
 * Intuition: Length 1–2 arrays can always be split. For longer arrays we only need one adjacent pair whose sum is >= m, because we can peel off singles until that pair remains.
 * Approach: 1. If n <= 2, return true. 2. Scan adjacent pairs; return true if any nums[i]+nums[i+1] >= m. 3. Otherwise false.
 * Dry Run: nums = [2,3,3,2,3], m = 6. Pair 3+3 = 6 >= 6, so true. nums = [2,1,3], m = 5 has adjacent sums 3 and 4, so false.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var canSplitArray = function (nums, m) {
  const n = nums.length;

  if (n <= 2) {
    return true;
  }

  for (let i = 0; i < n - 1; i++) {
    if (nums[i] + nums[i + 1] >= m) {
      return true;
    }
  }

  return false;
};

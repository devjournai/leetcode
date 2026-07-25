/**
 * Check if it is Possible to Split Array
 *
 * Intuition:
 * We need to repeatedly split the array until every resulting array
 * contains exactly one element.
 *
 * The key observation is:
 *
 * For n > 2, the array can be completely split if and only if there
 * exists at least one adjacent pair whose sum is >= m.
 *
 * Why?
 *
 * Consider an adjacent pair:
 *
 *      nums[i] + nums[i + 1] >= m
 *
 * We can keep this pair together while removing elements one by one
 * from the left and right sides.
 *
 * Every removed element becomes an array of length 1, which is always
 * considered good.
 *
 * The remaining array always contains our valid adjacent pair, so its
 * sum is at least m.
 *
 * Eventually, only the valid pair remains:
 *
 *      [nums[i], nums[i + 1]]
 *
 * Since its sum is >= m, it can finally be split into two single-element
 * arrays.
 *
 * -----------------------------------------------------------------------
 *
 * Special Cases:
 *
 * n = 1:
 *
 *      Already split into one array.
 *      Answer = true.
 *
 * n = 2:
 *
 *      We can directly split it into two arrays of length 1.
 *      Single-element arrays are always good.
 *
 *      Answer = true.
 *
 * n >= 3:
 *
 *      We need at least one adjacent pair satisfying:
 *
 *          nums[i] + nums[i + 1] >= m
 *
 * -----------------------------------------------------------------------
 *
 * Example:
 *
 * nums = [2, 3, 3, 2, 3]
 * m = 6
 *
 * We find:
 *
 *      3 + 3 = 6 >= 6
 *
 * Therefore, splitting is possible.
 *
 * We can keep [3,3] together and progressively remove the surrounding
 * elements until only [3,3] remains.
 *
 * Then:
 *
 *      [3,3] -> [3] + [3]
 *
 * Answer = true.
 *
 * -----------------------------------------------------------------------
 *
 * Example:
 *
 * nums = [2,1,3]
 * m = 5
 *
 * Adjacent sums:
 *
 *      2 + 1 = 3
 *      1 + 3 = 4
 *
 * Neither reaches 5.
 *
 * Therefore, there is no valid final pair that can be split.
 *
 * Answer = false.
 *
 * -----------------------------------------------------------------------
 *
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

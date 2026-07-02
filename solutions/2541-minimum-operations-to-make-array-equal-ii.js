/**
 * Minimum Operations to Make Array Equal II
 *
 * Intuition:
 * In one operation, we increase one element by `k` and decrease another element
 * by `k`. Therefore:
 *
 * 1. The total sum of the array never changes.
 * 2. Every change at an index must be a multiple of `k`.
 *
 * Let:
 *
 *      diff = nums2[i] - nums1[i]
 *
 * - If diff > 0, this index needs to receive `diff / k` operations.
 * - If diff < 0, this index needs to give `(-diff) / k` operations.
 *
 * The total number of required receiving operations is the minimum answer.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Handle the special case when k = 0.
 *
 *      Since no value can change,
 *      return:
 *          0  if both arrays are already equal.
 *         -1  otherwise.
 *
 * 2. Traverse every index.
 *
 *      Compute:
 *
 *          diff = nums2[i] - nums1[i]
 *
 *      If diff is not divisible by k,
 *      return -1.
 *
 * 3. Maintain:
 *
 *      positive =
 *          total operations needed to increase values.
 *
 *      negative =
 *          total operations needed to decrease values.
 *
 * 4. If
 *
 *      positive != negative
 *
 *      then the total transferred amount is different,
 *      so return -1.
 *
 * 5. Otherwise,
 *
 *      answer = positive.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums1 = [4,3,1,4]
 * nums2 = [1,3,7,1]
 * k = 3
 *
 * Index 0:
 *
 * diff = -3
 *
 * need to decrease
 *
 * negative = 1
 *
 * ----------------
 *
 * Index 1:
 *
 * diff = 0
 *
 * ----------------
 *
 * Index 2:
 *
 * diff = 6
 *
 * positive = 2
 *
 * ----------------
 *
 * Index 3:
 *
 * diff = -3
 *
 * negative = 2
 *
 * positive = 2
 *
 * negative = 2
 *
 * Equal
 *
 * Answer = 2
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var minOperations = function (nums1, nums2, k) {
  if (k === 0) {
    for (let i = 0; i < nums1.length; i++) {
      if (nums1[i] !== nums2[i]) {
        return -1;
      }
    }

    return 0;
  }

  let positive = 0;
  let negative = 0;

  for (let i = 0; i < nums1.length; i++) {
    const diff = nums2[i] - nums1[i];

    if (diff % k !== 0) {
      return -1;
    }

    if (diff > 0) {
      positive += diff / k;
    } else {
      negative += -diff / k;
    }
  }

  return positive === negative ? positive : -1;
};

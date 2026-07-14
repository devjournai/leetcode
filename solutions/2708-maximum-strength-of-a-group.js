/**
 * Maximum Strength of a Group
 *
 * Intuition:
 * Since the array size is at most 13, every possible non-empty subset can be
 * checked.
 *
 * There are:
 *
 *      2^N - 1
 *
 * non-empty subsets.
 *
 * Compute the product of every subset and keep the maximum product.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Let:
 *
 *      totalSubsets = 1 << n
 *
 * 2. Iterate over every non-empty subset.
 *
 * 3. For each subset:
 *
 *      Initialize:
 *
 *          product = 1
 *
 *      Traverse every bit.
 *
 *      If the bit is set,
 *      include that element in the product.
 *
 * 4. Update the maximum product.
 *
 * 5. Return the maximum product.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 *
 * [3,-1,-5]
 *
 * Subsets:
 *
 * {3}
 * Product = 3
 *
 * {-1}
 * Product = -1
 *
 * {-5}
 * Product = -5
 *
 * {3,-1}
 * Product = -3
 *
 * {3,-5}
 * Product = -15
 *
 * {-1,-5}
 * Product = 5
 *
 * {3,-1,-5}
 * Product = 15
 *
 * Maximum = 15
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N × 2^N)
 * Space Complexity: O(1)
 */
var maxStrength = function (nums) {
  const n = nums.length;

  let answer = -Infinity;

  const totalSubsets = 1 << n;

  for (let mask = 1; mask < totalSubsets; mask++) {
    let product = 1;

    for (let i = 0; i < n; i++) {
      if ((mask & (1 << i)) !== 0) {
        product *= nums[i];
      }
    }

    answer = Math.max(answer, product);
  }

  return answer;
};

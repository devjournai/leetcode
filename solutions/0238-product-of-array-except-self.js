/**
 * Product Of Array Except Self
 * Intuition: The value at i is (product of everything left of i) times (product of everything right of i). Two passes can fill those prefixes/suffixes into the output without a division step.
 * Approach: 1. Allocate `finalProducts` filled with 1. 2. Walk left to right: write `currentLeftProduct` at i, then multiply it by `nums[i]`. 3. Walk right to left: multiply `finalProducts[i]` by `currentRightProduct`, then multiply that running product by `nums[i]`. 4. Return `finalProducts`. Extra space besides the output is O(1).
 * Dry Run: nums = [1, 2, 3, 4].
 *   - Left pass: products become [1, 1, 2, 6]; left running product ends at 24.
 *   - Right pass: i=3 multiply 6*1=6, right=4; i=2 → 2*4=8, right=12; i=1 → 1*12=12, right=24; i=0 → 1*24=24. Return [24, 12, 8, 6].
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var productExceptSelf = function (nums) {
  const totalElements = nums.length;
  const finalProducts = new Array(totalElements).fill(1);

  let currentLeftProduct = 1;
  for (
    let currentForwardIndex = 0;
    currentForwardIndex < totalElements;
    currentForwardIndex++
  ) {
    finalProducts[currentForwardIndex] = currentLeftProduct;
    currentLeftProduct = currentLeftProduct * nums[currentForwardIndex];
  }

  let currentRightProduct = 1;
  for (
    let currentBackwardIndex = totalElements - 1;
    currentBackwardIndex >= 0;
    currentBackwardIndex--
  ) {
    finalProducts[currentBackwardIndex] =
      finalProducts[currentBackwardIndex] * currentRightProduct;
    currentRightProduct = currentRightProduct * nums[currentBackwardIndex];
  }

  return finalProducts;
};

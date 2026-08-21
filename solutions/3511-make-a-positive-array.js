/**
 * Make a Positive Array
 * Intuition: Every length-3+ subarray must stay positive. Greedily rewrite a later element to a huge value whenever the running minimum of those window sums would go non-positive.
 * Approach: 1. Track minSum of overlapping 3-length windows while scanning from index 2. 2. If minSum ≤ 0, set nums[i] to 10^18, reset minSum, and count one operation. 3. Return the operation count.
 * Dry Run: nums = [2, -1, -3]. Window 2-1-3 = -2 ≤ 0 → rewrite last to 10^18, 1 operation.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var makeArrayPositive = function (nums) {
  const MAX_VALUE = 1e18;
  let operations = 0;
  let minSum = nums[0] + nums[1];
  const bigNums = nums.slice();

  for (let i = 2; i < bigNums.length; i++) {
    const a = bigNums[i - 2];
    const b = bigNums[i - 1];
    const c = bigNums[i];
    minSum = Math.min(minSum + c, a + b + c);
    if (minSum <= 0) {
      bigNums[i] = MAX_VALUE;
      minSum = MAX_VALUE;
      operations += 1;
    }
  }

  return operations;
};

/**
 * Maximize Score After Pair Deletions
 * Intuition: Each deletion of two adjacent numbers scores their sum, until one or two numbers remain. The leftover is never scored, so maximizing the scored sum is equivalent to minimizing the leftover. Odd length leaves one element (drop the minimum). Even length leaves two adjacent elements (drop the minimum adjacent pair).
 * Approach: 1. Let total = sum(nums). 2. If n is odd, return total - min(nums). 3. If n is even, return total - min adjacent pair sum.
 * Dry Run: nums = [2,1,3]. Odd → 6 - 1 = 5 (delete 2+3). nums = [1,2,3,4] → 10 - min(1+2,2+3,3+4) = 10 - 3 = 7.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxScore = function (nums) {
  const n = nums.length;
  let total = 0;
  for (const num of nums) {
    total += num;
  }

  if (n % 2 === 1) {
    let minValue = nums[0];
    for (const num of nums) {
      minValue = Math.min(minValue, num);
    }
    return total - minValue;
  }

  let minAdjacentSum = nums[0] + nums[1];
  for (let i = 1; i < n; i++) {
    minAdjacentSum = Math.min(minAdjacentSum, nums[i - 1] + nums[i]);
  }
  return total - minAdjacentSum;
};

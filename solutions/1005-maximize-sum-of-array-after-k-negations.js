/**
 * Maximize Sum Of Array After K Negations
 * Intuition: Negating a negative number always helps. After negatives are gone, leftover odd k should flip the smallest remaining value.
 * Approach: 1. Sort ascending. 2. Flip negatives from the left while k remains. 3. If k is odd, sort again and flip the new minimum. 4. Return the sum.
 * Dry Run: nums = [4,2,3], k = 1.
 *   - Sorted [2,3,4], no negatives. k odd -> flip 2 to -2. Sum = 5.
 * Time Complexity: O(n log n)
 * Space Complexity: O(1)
 */
var largestSumAfterKNegations = function (nums, k) {
  nums.sort((alpha, beta) => alpha - beta);

  for (
    let pointer = 0;
    pointer < nums.length && k > 0 && nums[pointer] < 0;
    pointer++
  ) {
    nums[pointer] = -nums[pointer];
    k--;
  }

  if (k % 2 === 1) {
    nums.sort((alpha, beta) => alpha - beta);
    nums[0] = -nums[0];
  }

  return nums.reduce((total, current) => total + current, 0);
};

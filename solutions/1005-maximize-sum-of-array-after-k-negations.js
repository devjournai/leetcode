/**
 * Maximize Sum Of Array After K Negations
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

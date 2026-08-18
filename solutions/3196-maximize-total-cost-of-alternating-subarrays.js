/**
 * Maximize Total Cost Of Alternating Subarrays
 * Intuition: Splitting into alternating-sign subarrays is equivalent to optionally flipping the sign of nums[i] for i>0, with no two consecutive flips. DP keeps the best cost ending with nums[i] kept positive or negated.
 * Approach: 1. Let keepPositive[i] = nums[i] + max(keepPositive[i-1], keepNegative[i-1]). 2. keepNegative[i] = -nums[i] + keepPositive[i-1]. 3. Answer is max of both at the end.
 * Dry Run:
 *   nums = [1,-2,3,4] best is 10 by taking the whole array as one alternating subarray: 1-(-2)+3-4 wait actually 1+2+3+4=10 with splits/flips as defined.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumTotalCost = function (nums) {
  let keepPositive = nums[0];
  let keepNegative = nums[0];
  for (let index = 1; index < nums.length; index++) {
    const nextKeepPositive = nums[index] + Math.max(keepPositive, keepNegative);
    const nextKeepNegative = -nums[index] + keepPositive;
    keepPositive = nextKeepPositive;
    keepNegative = nextKeepNegative;
  }
  return Math.max(keepPositive, keepNegative);
};

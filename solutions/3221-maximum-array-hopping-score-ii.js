/**
 * Maximum Array Hopping Score II
 * Intuition: Same as hopping score I: the optimal jump always lands on a suffix maximum, so accumulate the running suffix max from right to left.
 * Approach: 1. Scan from n-1 down to 1 tracking the maximum remaining value. 2. Add that maximum at every index. 3. Return the total.
 * Dry Run:
 *   nums = [1, 5, 2, 3]
 *   suffixMax path 3 then 3 then 5 -> score 11.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxScore = function (nums) {
  let totalScore = 0;
  let suffixMaximum = 0;

  for (let currentIndex = nums.length - 1; currentIndex > 0; currentIndex--) {
    suffixMaximum = Math.max(suffixMaximum, nums[currentIndex]);
    totalScore += suffixMaximum;
  }

  return totalScore;
};

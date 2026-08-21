/**
 * Maximum Array Hopping Score I
 * Intuition: Score of a jump i -> j is (j - i) * nums[j]. The optimal policy always jumps to a current suffix maximum, so from the right we can accumulate the running maximum for every step leftward.
 * Approach: 1. Scan from n-1 down to 1 while tracking the maximum value seen so far in the suffix. 2. Add that maximum at each index (equivalent to hopping one step onto the suffix max). 3. Return the accumulated score from index 0.
 * Dry Run:
 *   nums = [1, 5, 2, 3]
 *   i=3: suffixMax=3, score=3
 *   i=2: suffixMax=3, score=6
 *   i=1: suffixMax=5, score=11
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

/**
 * Count Alternating Subarrays
 * Intuition: An alternating subarray is a maximal run of alternating bits; a run of length L contributes L*(L+1)/2 subarrays, but we count while scanning by extending the current streak.
 * Approach: 1. streak starts at 1. 2. If nums[i] != nums[i-1], increment streak else reset to 1. 3. Add streak to the answer each step.
 * Dry Run:
 *   nums = [0,1,1,1] answers add 1+2+1+1 = 5
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var countAlternatingSubarrays = function (nums) {
  let alternatingCount = 1;
  let currentStreak = 1;
  for (let index = 1; index < nums.length; index++) {
    if (nums[index] !== nums[index - 1]) {
      currentStreak++;
    } else {
      currentStreak = 1;
    }
    alternatingCount += currentStreak;
  }
  return alternatingCount;
};

/**
 * Count Subarrays of Length Three With a Condition
 * Intuition: Only windows of length 3 matter. The first and third values must sum to half of the middle, i.e. `2 * (left + right) === middle`.
 * Approach: 1. Slide i from 1 to n-2. 2. Count when `nums[i] === 2 * (nums[i-1] + nums[i+1])`.
 * Dry Run: nums = [1, 2, 1, 4, 1]. Windows: (1,2,1) 2==2*(1+1)? 2==4 no; (2,1,4) 1==2*(2+4)? no; (1,4,1) 4==2*(1+1)=4 yes. Answer 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var countSubarrays = function (nums) {
  let matchingWindows = 0;
  for (let middleIndex = 1; middleIndex + 1 < nums.length; middleIndex++) {
    if (
      nums[middleIndex] ===
      2 * (nums[middleIndex - 1] + nums[middleIndex + 1])
    ) {
      matchingWindows++;
    }
  }
  return matchingWindows;
};

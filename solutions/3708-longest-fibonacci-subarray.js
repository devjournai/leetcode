/**
 * Longest Fibonacci Subarray
 * Intuition: A Fibonacci subarray of length ≥ 2 always exists. Extend a run while nums[i] == nums[i-1] + nums[i-2], else reset the run to 2.
 * Approach: Scan from index 2, grow or reset the current length, track the maximum.
 * Dry Run: [1, 1, 2, 3, 5] grows to length 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestSubarray = function (nums) {
  const n = nums.length;
  let longest = 2;
  let current = 2;
  for (let index = 2; index < n; index++) {
    if (nums[index] === nums[index - 1] + nums[index - 2]) {
      current++;
      longest = Math.max(longest, current);
    } else {
      current = 2;
    }
  }
  return longest;
};

/**
 * Valid Subarrays With Matching Sum Digits I
 * Intuition: We can enumerate the left endpoint l of the subarray, and for each l, we enumerate the right endpoint r in the range [l, n), and calculate the sum of nums[l..r]. If it satisfies the conditions, the answer is increased by one.
 * Approach: 1. Follow Enumeration. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: nums = [1,100,1], x = 1. Output: 4.
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var countValidSubarrays = function (nums, x) {
  const n = nums.length;
  let ans = 0;

  for (let l = 0; l < n; l++) {
    let s = 0;

    for (let r = l; r < n; r++) {
      s += nums[r];

      if (s % 10 === x && Number(s.toString()[0]) === x) {
        ans++;
      }
    }
  }

  return ans;
};

/**
 * Maximum Subarray Sum After at Most K Swaps
 * Intuition: You may bring up to k outside large values into a subarray in exchange for small ones. For a candidate window, replace the smallest window values with the largest outside values (up to k).
 * Approach: 1. Try all windows O(n^2) with n<=1500. 2. For each window merge-sort the inside smallest and outside largest.
 * Dry Run: Input: nums = [1,-1,0,2], k = 1. Output: 3.
 * Time Complexity: O(N^2 log N)
 * Space Complexity: O(N)
 */
var maxSubarraySum = function (nums, k) {
  const n = nums.length;
  let ans = -1e18;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const inside = nums.slice(i, j + 1).sort((a, b) => a - b);
      const outside = nums
        .slice(0, i)
        .concat(nums.slice(j + 1))
        .sort((a, b) => b - a);
      let sum = 0;
      for (const x of inside) sum += x;
      let t = 0;
      while (
        t < k &&
        t < inside.length &&
        t < outside.length &&
        outside[t] > inside[t]
      ) {
        sum += outside[t] - inside[t];
        t++;
      }
      ans = Math.max(ans, sum);
    }
  }
  return ans;
};

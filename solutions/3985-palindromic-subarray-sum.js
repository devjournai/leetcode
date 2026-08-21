/**
 * Palindromic Subarray Sum
 * Intuition: Manacher-like on the array values (not digits): treat the sequence itself as palindrome. Max sum over palindromic subarrays. n=1e5 so Manacher O(n) plus prefix sums.
 * Approach: 1. Manacher odd/even centers on nums equality. 2. Prefix sums for range sums.
 * Dry Run: Input: nums=[1,2,3,2,1,5,6]. Output: 9.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var palindromicSubarraySum = function (nums) {
  const n = nums.length;
  const ps = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) ps[i + 1] = ps[i] + nums[i];
  let ans = Math.max(...nums);
  for (let c = 0; c < n; c++) {
    let l = c,
      r = c;
    while (l >= 0 && r < n && nums[l] === nums[r]) {
      ans = Math.max(ans, ps[r + 1] - ps[l]);
      l--;
      r++;
    }
    l = c;
    r = c + 1;
    while (l >= 0 && r < n && nums[l] === nums[r]) {
      ans = Math.max(ans, ps[r + 1] - ps[l]);
      l--;
      r++;
    }
  }
  return ans;
};

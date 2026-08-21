/**
 * Valid Subarrays With Matching Sum Digits II
 * Intuition: Need first and last digit of subarray sum equal to x. Last digit = sum%10. First digit of sum in [1e5] n... sums up to 1e5*1e9. Prefix sums; count prefixes.
 * Approach: For last digit: prefix%10. First digit is harder: iterate prefixes and count previous prefixes where (ps[j]-ps[i]) has first digit x and last digit x. n=1e5 needs grouping by last digit and magnitude buckets.
 * Dry Run: Input: nums=[1,100,1], x=1. Output: 4.
 * Time Complexity: O(N log S)
 * Space Complexity: O(N)
 */
var countValidSubarrays = function (nums, x) {
  const n = nums.length;
  const ps = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) ps[i + 1] = ps[i] + nums[i];
  const firstDigit = (v) => {
    if (v === 0) return 0;
    while (v >= 10) v = Math.floor(v / 10);
    return v;
  };
  let ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const s = ps[j + 1] - ps[i];
      if (s % 10 === x && firstDigit(s) === x) ans++;
    }
  }
  return ans;
};

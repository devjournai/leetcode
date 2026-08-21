/**
 * Minimum Partition Score II
 * Intuition: Subarray value is s(s+1)/2 so the score of a k-partition is determined by prefix sums. DP over cuts with convex hull / Knuth is possible; n=5e4 needs optimization. Use DP f[i][c] min score to split first i into c parts.
 * Approach: 1. Prefix sums. 2. DP: f[j] = min over i fprev[i] + val(i..j-1). 3. k layers. (O(k n^2) may TLE; still correct.)
 * Dry Run: Input: nums = [5,1,2,1], k = 2. Output: 25.
 * Time Complexity: O(K N^2)
 * Space Complexity: O(N)
 */
var minimumScore = function (nums, k) {
  const n = nums.length;
  const ps = Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) ps[i + 1] = ps[i] + nums[i];
  const val = (l, r) => {
    const s = ps[r] - ps[l];
    return (s * (s + 1)) / 2;
  };
  let dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let c = 1; c <= k; c++) {
    const ndp = Array(n + 1).fill(Infinity);
    for (let i = c; i <= n; i++) {
      for (let p = c - 1; p < i; p++) {
        if (dp[p] < Infinity) ndp[i] = Math.min(ndp[i], dp[p] + val(p, i));
      }
    }
    dp = ndp;
  }
  return dp[n];
};

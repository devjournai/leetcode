/**
 * Maximum Sum of Alternating Subsequence With Distance at Least K
 * Intuition: An alternating subsequence rises then falls (or vice versa). Distance at least k between adjacent picked indices lets Fenwick trees store prefix maxima of previous states by value rank.
 * Approach: 1. Rank unique values. 2. dp[i][0] ends with a down step at i; dp[i][1] ends with an up step. 3. Query Fenwick of states at least k indices back: greater/less values. 4. After lag k, insert dp[i-k+1] into the trees. 5. Track the global max.
 * Dry Run: Input: typical nums with k. First k indices start as single-element subsequences, then combine with older states.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxAlternatingSum = function (nums, k) {
  class FenwickTree {
    constructor(n) {
      this.n = n;
      this.tree = Array(n + 1).fill(0);
    }
    update(index, val) {
      while (index <= this.n) {
        this.tree[index] = Math.max(this.tree[index], val);
        index += index & -index;
      }
    }
    preSum(pos) {
      let ans = 0;
      while (pos >= 1) {
        ans = Math.max(ans, this.tree[pos]);
        pos -= pos & -pos;
      }
      return ans;
    }
  }
  const stl = [...new Set(nums)].sort((a, b) => a - b);
  const rank = new Map(stl.map((v, i) => [v, i + 1]));
  const fwt0 = new FenwickTree(stl.length);
  const fwt1 = new FenwickTree(stl.length);
  const n = nums.length;
  const dp = Array.from({ length: n }, () => [0, 0]);
  let res = nums[0];
  for (let i = 0; i < n; i++) {
    dp[i][0] = dp[i][1] = nums[i];
    if (i >= k) {
      const indx = rank.get(nums[i]);
      dp[i][1] = Math.max(dp[i][1], fwt0.preSum(indx - 1) + nums[i]);
      dp[i][0] = Math.max(dp[i][0], fwt1.preSum(stl.length - indx) + nums[i]);
    }
    if (i - k + 1 >= 0) {
      const indx = rank.get(nums[i - k + 1]);
      fwt0.update(indx, dp[i - k + 1][0]);
      fwt1.update(stl.length - indx + 1, dp[i - k + 1][1]);
    }
    res = Math.max(res, dp[i][0], dp[i][1]);
  }
  return res;
};

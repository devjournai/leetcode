/**
 * Subtree Inversion Sum II
 * Intuition: Invert a subtree multiplies it by -1. Inversions must be distance >= k. Tree DP with last inversion depth.
 * Approach: DFS dp[u][distSinceInvert][sign] maximum contribution. Dist k<= typically small from similar problem 3544 (k<=50). Use k as given.
 * Dry Run: Input: sample tree. Output: 23.
 * Time Complexity: O(N K)
 * Space Complexity: O(N K)
 */
var subtreeInversionSum = function (edges, nums, k) {
  const n = nums.length;
  const g = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    g[u].push(v);
    g[v].push(u);
  }
  const memo = new Map();
  const dfs = (u, p, dist, sign) => {
    const key = u + "," + dist + "," + sign;
    if (memo.has(key)) return memo.get(key);
    let no = sign * nums[u];
    for (const v of g[u])
      if (v !== p) no += dfs(v, u, dist === 0 ? 0 : dist + 1, sign);
    let yes = -1e18;
    if (dist === 0 || dist >= k) {
      yes = -sign * nums[u];
      for (const v of g[u]) if (v !== p) yes += dfs(v, u, 1, -sign);
    }
    const res = Math.max(no, yes);
    memo.set(key, res);
    return res;
  };
  return dfs(0, -1, 0, 1);
};

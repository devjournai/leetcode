/**
 * Count Distinct Ways to Form Target from Two Strings
 * Intuition: DP over target index and positions in both words, requiring both used.
 * Approach: dp[i][p1][p2][mask] too big. Instead dp[i][usedMask] with next-occurrence lists: O(|t| * n * m). Lengths typically small.
 * Dry Run: Input: word1=abc, word2=bac, target=abc. Output: 5.
 * Time Complexity: O(|t| N M)
 * Space Complexity: O(N M)
 */
var numWays = function (word1, word2, target) {
  const MOD = 1000000007;
  const n = word1.length,
    m = word2.length,
    t = target.length;
  const memo = new Map();
  const dfs = (i, p1, p2, used) => {
    if (i === t) return used === 3 ? 1 : 0;
    const key = i + "," + p1 + "," + p2 + "," + used;
    if (memo.has(key)) return memo.get(key);
    let res = 0;
    for (let x = p1; x < n; x++)
      if (word1[x] === target[i])
        res = (res + dfs(i + 1, x + 1, p2, used | 1)) % MOD;
    for (let y = p2; y < m; y++)
      if (word2[y] === target[i])
        res = (res + dfs(i + 1, p1, y + 1, used | 2)) % MOD;
    memo.set(key, res);
    return res;
  };
  return dfs(0, 0, 0, 0);
};

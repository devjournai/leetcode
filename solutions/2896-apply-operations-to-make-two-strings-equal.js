/**
 * Apply Operations to Make Two Strings Equal
 * Intuition: Only mismatch positions matter. An odd count is impossible. Pair mismatches either with cost x or by sliding adjacent mismatches at distance cost.
 * Approach: 1. Collect mismatch indices; if odd return -1, if empty return 0. 2. Memoized dfs(i,j) on the remaining range: pair ends with x, or pair the two leftmost neighbors by distance, or the two rightmost. 3. Return dfs(0, m-1).
 * Dry Run: mismatches at [0,3,4,8], x=2. Pair 3 with 4 (cost 1) and 0 with 8 (cost 2). Total 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var minOperations = function (s1, s2, x) {
  const positions = [];

  for (let i = 0; i < s1.length; i++) {
    if (s1[i] !== s2[i]) {
      positions.push(i);
    }
  }

  const m = positions.length;

  if (m & 1) {
    return -1;
  }

  if (m === 0) {
    return 0;
  }

  const dp = new Array(m + 1).fill(Infinity);
  dp[0] = 0;
  dp[1] = x;

  for (let i = 1; i <= m; i++) {
    if (i >= 2) {
      dp[i] = Math.min(dp[i], dp[i - 2] + x);
      dp[i] = Math.min(
        dp[i],
        dp[i - 2] + (positions[i - 1] - positions[i - 2])
      );
    }

    if (i >= 1) {
      dp[i] = Math.min(dp[i], dp[i - 1] + x / 2);
    }
  }

  const memo = new Map();

  function dfs(i, j) {
    if (i > j) return 0;
    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    let res = dfs(i + 1, j - 1) + x;

    res = Math.min(res, dfs(i + 2, j) + (positions[i + 1] - positions[i]));
    res = Math.min(res, dfs(i, j - 2) + (positions[j] - positions[j - 1]));

    memo.set(key, res);
    return res;
  }

  return dfs(0, m - 1);
};

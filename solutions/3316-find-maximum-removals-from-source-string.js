/**
 * Find Maximum Removals From Source String
 * Intuition: Removals are only allowed at targetIndices, and `pattern` must remain a subsequence of what is left. DP on (source index, pattern index) chooses pick-to-match vs skip (and maybe remove).
 * Approach: 1. Put targetIndices in a set. 2. dp[j] = max removals for pattern[j..] using the suffix of source processed so far. 3. Scan source from the right. 4. pick if chars match; skip adds 1 when the index is removable. 5. Impossible states stay -Infinity and become 0 at the end.
 * Dry Run: source = "abbaa", pattern = "aba", targetIndices = [0,1,2]
 *   - Can delete two of the first three letters and still keep "aba" → 2
 * Time Complexity: O(M * N)
 * Space Complexity: O(N)
 */
var maxRemovals = function (source, pattern, targetIndices) {
  const m = source.length;
  const n = pattern.length;
  const target = new Set(targetIndices);
  const NEG = Number.NEGATIVE_INFINITY;
  const dp = Array(n + 1).fill(NEG);
  dp[n] = 0;

  for (let i = m - 1; i >= 0; i--) {
    const newDp = dp.slice();
    newDp[n] = (target.has(i) ? 1 : 0) + dp[n];
    for (let j = 0; j < n; j++) {
      const pick = source[i] === pattern[j] ? dp[j + 1] : NEG;
      const skip = (target.has(i) ? 1 : 0) + dp[j];
      newDp[j] = Math.max(pick, skip);
    }
    for (let j = 0; j <= n; j++) {
      dp[j] = newDp[j];
    }
  }

  return dp[0] === NEG ? 0 : dp[0];
};

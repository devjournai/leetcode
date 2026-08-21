/**
 * Lexicographically Smallest String After Adjacent Removals
 * Intuition: Removals of consecutive pairs (circular alphabet) are optional. Interval DP decides whether to keep s[i] or pair it with a later s[k] after the middle fully cancels.
 * Approach: 1. dp[i][j] is the lex-smallest string for s[i..j). 2. Either keep s[i] plus dp[i+1][j], or if s[i] and s[k] are consecutive and dp[i+1][k] is empty, take dp[k+1][j]. 3. Choose the minimum string.
 * Dry Run: s = "abc". Pair b,c (consecutive) leaving "a". Pair a,b leaving "c". "a" < "c", answer "a".
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var lexicographicallySmallestString = function (s) {
  const n = s.length;
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(""));

  const isConsecutive = (a, b) => {
    const diff = Math.abs(a.charCodeAt(0) - b.charCodeAt(0));
    return diff === 1 || diff === 25;
  };

  for (let length = 1; length <= n; length++) {
    for (let i = 0; i + length <= n; i++) {
      const j = i + length;
      let best = s[i] + dp[i + 1][j];
      for (let k = i + 1; k < j; k++) {
        if (isConsecutive(s[i], s[k]) && dp[i + 1][k] === "") {
          const candidate = dp[k + 1][j];
          if (candidate < best) {
            best = candidate;
          }
        }
      }
      dp[i][j] = best;
    }
  }

  return dp[0][n];
};

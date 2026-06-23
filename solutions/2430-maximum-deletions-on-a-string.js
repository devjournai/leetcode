/**
 * Maximum Deletions on a String
 *
 * Intuition: We want the maximum number of operations. At position i, we can delete the first len characters if: s[i ... i + len - 1] == s[i + len ... i + 2*len - 1] After deleting those len characters, we continue solving the remaining suffix. Therefore: dp[i] = maximum operations needed to delete s[i...] The challenge is checking whether two substrings are equal efficiently.
 * Since n = 4000,
 * comparing substrings directly would be too slow.
 * We precompute:
 * lcp[i][j] = length of the longest common prefix between suffixes starting at i and j.
 * Then: First len chars equal next len chars iff lcp[i][i + len] >= len which can be checked in O(1).
 * Approach:
 * 1. Build LCP table.
 *
 *      lcp[i][j]
 *      =
 *      number of matching characters
 *      starting from i and j.
 *
 * 2. Create DP array.
 *
 *      dp[i]
 *
 *      =
 *      maximum operations needed
 *      to delete suffix s[i...]
 *
 * 3. Initialize:
 *
 *      dp[i] = 1
 *
 * because we can always delete
 * the remaining string entirely.
 *
 * 4. For every position i:
 *
 *      Try every possible deletion length len.
 *
 *      If:
 *
 *      lcp[i][i + len] >= len
 *
 *      then:
 *
 *      dp[i]
 *      =
 *      max(
 *          dp[i],
 *          1 + dp[i + len]
 *      )
 *
 * 5. Return dp[0].
 *
 * Dry Run:
 *
 * s = "aaaaa"
 *
 * Index:
 *
 * 0 1 2 3 4
 * a a a a a
 *
 * dp initialized:
 *
 * [1,1,1,1,1]
 *
 * i = 3
 *
 * Cannot split.
 *
 * dp[3] = 1
 *
 * --------------------------------
 *
 * i = 2
 *
 * len = 1
 *
 * "a" == "a"
 *
 * dp[2]
 * =
 * max(
 *      1,
 *      1 + dp[3]
 * )
 *
 * =
 * 2
 *
 * --------------------------------
 *
 * i = 1
 *
 * len = 1
 *
 * "a" == "a"
 *
 * dp[1]
 * =
 * 1 + dp[2]
 * =
 * 3
 *
 * --------------------------------
 *
 * i = 0
 *
 * len = 1
 *
 * "a" == "a"
 *
 * dp[0]
 * =
 * 1 + dp[1]
 * =
 * 4
 *
 * len = 2
 *
 * "aa" == "aa"
 *
 * dp[0]
 * =
 * max(
 *      4,
 *      1 + dp[2]
 * )
 *
 * =
 * 4
 *
 * Continue...
 *
 * Final:
 *
 * dp[0] = 5
 *
 * Answer = 5
 *
 * --------------------------------------------------
 *
 * Example:
 *
 * s = "aaabaab"
 *
 * Delete:
 *
 * a
 * →
 * aabaab
 *
 * Delete:
 *
 * aab
 * →
 * aab
 *
 * Delete:
 *
 * a
 * →
 * ab
 *
 * Delete all
 *
 * Total = 4
 *
 * Time Complexity: O(N²)
 * Space Complexity: O(N²)
 */
var deleteString = function (s) {
  const n = s.length;

  const lcp = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));

  for (let i = n - 1; i >= 0; i--) {
    for (let j = n - 1; j > i; j--) {
      if (s[i] === s[j]) {
        lcp[i][j] = lcp[i + 1][j + 1] + 1;
      }
    }
  }

  const dp = new Array(n).fill(1);

  for (let i = n - 1; i >= 0; i--) {
    for (let len = 1; i + 2 * len <= n; len++) {
      if (lcp[i][i + len] >= len) {
        dp[i] = Math.max(dp[i], 1 + dp[i + len]);
      }
    }
  }

  return dp[0];
};

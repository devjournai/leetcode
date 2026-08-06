/**
 * Apply Operations to Make Two Strings Equal
 *
 * Intuition:
 * First collect all positions where s1 and s2 differ.
 *
 * Let those positions be:
 *
 *      p0, p1, p2, ...
 *
 * Every operation fixes exactly two mismatched positions.
 *
 * Therefore:
 *
 * • If the number of mismatches is odd,
 *   answer is impossible.
 *
 * Otherwise, we need to optimally pair mismatches.
 *
 * -----------------------------------------------------------------------
 *
 * Observation:
 *
 * There are only two useful choices.
 *
 * 1.
 * Pair two adjacent mismatches using the adjacent-flip operation.
 *
 * If mismatches are at
 *
 *      pos[i-1], pos[i]
 *
 * then moving the mismatch costs
 *
 *      pos[i] - pos[i-1]
 *
 * because every adjacent flip shifts the mismatch by one position.
 *
 * Cost:
 *
 *      distance
 *
 * 2.
 * Pair any two mismatches directly using the first operation.
 *
 * Cost:
 *
 *      x
 *
 * -----------------------------------------------------------------------
 *
 * DP
 *
 * Let
 *
 *      dp[i]
 *
 * be the minimum cost after processing the first i mismatches.
 *
 * Transition:
 *
 * 1.
 * Pair the last mismatch with any previous one using operation 1.
 *
 *      dp[i] = dp[i-2] + x
 *
 * 2.
 * Pair two adjacent mismatches.
 *
 *      dp[i] =
 *          dp[i-2] +
 *          (pos[i-1] - pos[i-2])
 *
 * Take the minimum.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * positions =
 *
 * [0,3,4,8]
 *
 * x = 2
 *
 * Pair:
 *
 *      (3,4)
 *
 * cost = 1
 *
 * Pair:
 *
 *      (0,8)
 *
 * cost = 2
 *
 * Total = 3
 *
 * -----------------------------------------------------------------------
 *
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

  for (let i = 2; i <= m; i += 2) {
    dp[i] = Math.min(dp[i], dp[i - 2] + x);

    dp[i] = Math.min(dp[i], dp[i - 2] + (positions[i - 1] - positions[i - 2]));
  }

  return dp[m];
};

/**
 * Maximize Value of Function in a Ball Passing Game
 *
 * Intuition:
 * Starting from player i, we make exactly k passes.
 *
 * The score is:
 *
 *      i
 *    + receiver[i]
 *    + receiver(receiver[i])
 *    + ...
 *
 * Since k can be as large as 10^10, simulating every pass is impossible.
 *
 * This is a classic Binary Lifting problem.
 *
 * For every player and every power of two, we precompute:
 *
 *      next[p][i]
 *
 *          = player reached after 2^p passes.
 *
 * and
 *
 *      sum[p][i]
 *
 *          = total score contributed by those 2^p passes
 *            (excluding the starting player).
 *
 * Then every value of k can be decomposed into powers of two.
 *
 * -----------------------------------------------------------------------
 *
 * Binary Lifting Tables:
 *
 * Base (2^0 = 1 pass):
 *
 *      next[0][i] = receiver[i]
 *
 *      sum[0][i] = receiver[i]
 *
 * because after one pass we visit exactly receiver[i].
 *
 * Higher Powers:
 *
 * Suppose we already know information for:
 *
 *      2^(p-1)
 *
 * Then:
 *
 *      first half:
 *
 *          i → mid
 *
 *      second half:
 *
 *          mid → destination
 *
 * Therefore:
 *
 *      next[p][i]
 *          =
 *          next[p-1][ next[p-1][i] ]
 *
 *      sum[p][i]
 *          =
 *          sum[p-1][i]
 *          +
 *          sum[p-1][ next[p-1][i] ]
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute:
 *
 *      LOG = number of bits needed for k.
 *
 * 2. Build:
 *
 *      next[LOG][n]
 *      sum[LOG][n]
 *
 * 3. For every starting player:
 *
 *      score = starting index
 *
 *      current = starting player
 *
 *      For every bit of k:
 *
 *          If the bit is set:
 *
 *              score += sum[bit][current]
 *
 *              current =
 *                  next[bit][current]
 *
 * 4. Keep the maximum score.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * receiver = [2,0,1]
 * k = 4
 *
 * Start = 2
 *
 * score = 2
 *
 * Binary:
 *
 *      4 = 100₂
 *
 * We use only the 2² jump.
 *
 * Following 4 passes:
 *
 *      2 → 1 → 0 → 2 → 1
 *
 * Added score:
 *
 *      1 + 0 + 2 + 1 = 4
 *
 * Total:
 *
 *      2 + 4 = 6
 *
 * Answer = 6
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log K)
 * Space Complexity: O(N log K)
 */

var getMaxFunctionValue = function (receiver, k) {
  const n = receiver.length;

  const LOG = Math.floor(Math.log2(k)) + 1;

  const next = Array.from({ length: LOG }, () => new Array(n));
  const sum = Array.from({ length: LOG }, () => new Array(n));

  for (let i = 0; i < n; i++) {
    next[0][i] = receiver[i];
    sum[0][i] = BigInt(receiver[i]);
  }

  for (let p = 1; p < LOG; p++) {
    for (let i = 0; i < n; i++) {
      const mid = next[p - 1][i];

      next[p][i] = next[p - 1][mid];
      sum[p][i] = sum[p - 1][i] + sum[p - 1][mid];
    }
  }

  let answer = 0n;

  for (let start = 0; start < n; start++) {
    let current = start;
    let score = BigInt(start);

    let steps = BigInt(k);
    let bit = 0;

    while (steps > 0n) {
      if (steps & 1n) {
        score += sum[bit][current];
        current = next[bit][current];
      }

      steps >>= 1n;
      bit++;
    }

    if (score > answer) {
      answer = score;
    }
  }

  return Number(answer);
};

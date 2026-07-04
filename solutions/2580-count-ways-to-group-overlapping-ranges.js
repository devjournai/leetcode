/**
 * Count Ways to Group Overlapping Ranges
 *
 * Intuition:
 * Any overlapping ranges must belong to the same group.
 *
 * Therefore, all overlapping ranges form one connected component.
 * Every connected component has only two choices:
 *
 *      • Put the entire component into Group 1.
 *      • Put the entire component into Group 2.
 *
 * If there are `components` independent merged intervals,
 * the answer is simply:
 *
 *      2 ^ components
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort all ranges by:
 *      - starting point
 *      - ending point
 *
 * 2. Merge overlapping ranges.
 *
 *      Maintain:
 *          currentStart
 *          currentEnd
 *
 *      For every interval:
 *
 *          If
 *              start <= currentEnd
 *
 *          then the ranges overlap,
 *          so extend:
 *
 *              currentEnd =
 *                  max(currentEnd, end)
 *
 *          Otherwise,
 *          a new connected component starts.
 *
 * 3. Count the total number of merged components.
 *
 * 4. Compute:
 *
 *      answer = 2 ^ components (mod 1e9+7)
 *
 *      using Fast Modular Exponentiation.
 *
 * 5. Return the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * ranges =
 *
 * [[1,3],[10,20],[2,5],[4,8]]
 *
 * After sorting:
 *
 * [1,3]
 * [2,5]
 * [4,8]
 * [10,20]
 *
 * Merge:
 *
 * [1,3]
 *
 * overlaps
 *
 * [2,5]
 *
 * =>
 * [1,5]
 *
 * overlaps
 *
 * [4,8]
 *
 * =>
 * [1,8]
 *
 * Next:
 *
 * [10,20]
 *
 * doesn't overlap.
 *
 * Components:
 *
 * [1,8]
 * [10,20]
 *
 * Total Components = 2
 *
 * Answer:
 *
 * 2² = 4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */

var countWays = function (ranges) {
  const MOD = 1000000007n;

  ranges.sort((a, b) => {
    if (a[0] !== b[0]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  let components = 0;

  let currentEnd = -1;

  for (const [start, end] of ranges) {
    if (start > currentEnd) {
      components++;
      currentEnd = end;
    } else {
      currentEnd = Math.max(currentEnd, end);
    }
  }

  let answer = 1n;
  let base = 2n;
  let power = BigInt(components);

  while (power > 0n) {
    if (power & 1n) {
      answer = (answer * base) % MOD;
    }

    base = (base * base) % MOD;
    power >>= 1n;
  }

  return Number(answer);
};

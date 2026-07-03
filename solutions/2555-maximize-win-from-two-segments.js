/**
 * Maximize Win From Two Segments
 *
 * Intuition:
 * Since `prizePositions` is already sorted, we can use a sliding window to find
 * how many prizes each segment of length `k` can collect.
 *
 * While scanning from left to right:
 * - `windowSize` = prizes covered by the current segment.
 * - `best[i]` = maximum prizes collectible using one segment considering only
 *   the first `i` prizes.
 *
 * For every ending index, combine:
 * - the current segment, and
 * - the best segment completely before it.
 *
 * This guarantees the maximum prizes collected using two segments.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Let:
 *      left = 0
 *
 * 2. Maintain:
 *      best[i]
 *      = maximum prizes collected by one segment among indices [0...i].
 *
 * 3. Iterate `right` from 0 to n-1.
 *
 *      While:
 *
 *          prizePositions[right] - prizePositions[left] > k
 *
 *      move `left` forward.
 *
 *      Current window size:
 *
 *          window = right - left + 1
 *
 * 4. Combine:
 *
 *      current window
 *      +
 *      best segment before `left`
 *
 *      answer =
 *          max(answer,
 *              window + best[left])
 *
 * 5. Update:
 *
 *      best[right + 1]
 *      =
 *      max(best[right], window)
 *
 * 6. Return the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * prizePositions =
 * [1,1,2,2,3,3,5]
 *
 * k = 2
 *
 * right = 5
 *
 * Window:
 *
 * [1,1,2,2,3,3]
 *
 * window = 6
 *
 * best before left = 0
 *
 * answer = 6
 *
 * right = 6
 *
 * Window:
 *
 * [3,3,5]
 *
 * window = 3
 *
 * best before left = 4
 *
 * answer =
 * max(6,4+3)
 * = 7
 *
 * Return 7.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */

var maximizeWin = function (prizePositions, k) {
  const n = prizePositions.length;

  const best = new Array(n + 1).fill(0);

  let answer = 0;
  let left = 0;

  for (let right = 0; right < n; right++) {
    while (prizePositions[right] - prizePositions[left] > k) {
      left++;
    }

    const window = right - left + 1;

    answer = Math.max(answer, window + best[left]);

    best[right + 1] = Math.max(best[right], window);
  }

  return answer;
};

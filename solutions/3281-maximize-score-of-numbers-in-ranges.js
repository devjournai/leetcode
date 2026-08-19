/**
 * Maximize Score of Numbers in Ranges
 * Intuition: We must pick one integer from each interval [start[i], start[i] + d]. The score is the minimum gap between consecutive chosen numbers after sorting. A larger minimum gap is harder to achieve, so the answer is monotonic and can be binary-searched.
 * Approach:
 * 1. Sort `start` so intervals are in left-to-right order.
 * 2. Binary search the candidate minimum gap `m` in `[0, (maxStart + d) - minStart]`.
 * 3. Greedy check: place the first number at `start[0]`. For each next interval, place the number as far left as possible but at least `lastPick + m`, clamped into `[start[i], start[i] + d]`. If that exceeds `start[i] + d`, `m` is impossible.
 * 4. If `m` is possible, try larger; otherwise try smaller. Return the largest feasible `m`.
 * Dry Run: start = [6, 0, 3], d = 2
 *   - Sorted start = [0, 3, 6]. Search range [0, 8].
 *   - m = 4: pick 0, then max(0+4, 3) = 4 (<= 5), then max(4+4, 6) = 8 (<= 8). Feasible.
 *   - m = 5: pick 0, then 5 (<= 5), then 10 > 8. Impossible.
 *   - Answer is 4 (e.g. 0, 4, 8).
 * Time Complexity: O(n log n + n log(maxStart + d - minStart))
 * Space Complexity: O(log n) for sorting, or O(n) depending on the sort implementation
 */
var maxPossibleScore = function (start, d) {
  start.sort((a, b) => a - b);

  const isPossible = (m) => {
    let lastPick = start[0];

    for (let i = 1; i < start.length; i++) {
      if (lastPick + m > start[i] + d) return false;
      lastPick = Math.max(lastPick + m, start[i]);
    }

    return true;
  };

  let l = 0;
  let r = start[start.length - 1] + d - start[0] + 1;

  while (l < r) {
    const m = Math.floor((l + r) / 2);

    if (isPossible(m)) l = m + 1;
    else r = m;
  }

  return l - 1;
};

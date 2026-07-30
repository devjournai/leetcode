/**
 * Determine if a Cell Is Reachable at a Given Time
 *
 * Intuition:
 * From a cell, we can move to any of its 8 neighboring cells.
 *
 * Therefore, in one second we can:
 *
 *      • Move horizontally.
 *      • Move vertically.
 *      • Move diagonally.
 *
 * Since diagonal movement is allowed, one diagonal move can reduce both the
 * x-distance and y-distance simultaneously.
 *
 * Hence, the minimum time required to reach the destination is the
 * Chebyshev distance:
 *
 *      max(|fx - sx|, |fy - sy|)
 *
 * If t is smaller than this minimum distance, reaching the destination is
 * impossible.
 *
 * There is one special case:
 *
 * If the start and destination are the same cell:
 *
 * • When t = 0, we are already at the destination.
 * • When t = 1, it is impossible because we must move to an adjacent cell and
 *   cannot stay in place.
 * • For t ≥ 2, we can move to a neighboring cell and come back, so it is
 *   always possible.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. If the start and destination are the same:
 *
 *      • Return false if t == 1.
 *      • Otherwise return true.
 *
 * 2. Compute:
 *
 *      dx = |fx - sx|
 *      dy = |fy - sy|
 *
 * 3. Compute the minimum required time:
 *
 *      max(dx, dy)
 *
 * 4. Return whether:
 *
 *      t >= max(dx, dy)
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * sx = 2, sy = 4
 * fx = 7, fy = 7
 * t = 6
 *
 * dx = 5
 * dy = 3
 *
 * Minimum time:
 *
 *      max(5, 3) = 5
 *
 * Since:
 *
 *      6 >= 5
 *
 * Answer:
 *
 *      true
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

var isReachableAtTime = function (sx, sy, fx, fy, t) {
  if (sx === fx && sy === fy) {
    return t !== 1;
  }

  const dx = Math.abs(fx - sx);
  const dy = Math.abs(fy - sy);

  const minimumTime = Math.max(dx, dy);

  return t >= minimumTime;
};

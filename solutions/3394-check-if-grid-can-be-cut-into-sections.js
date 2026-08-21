/**
 * Check if Grid can be Cut into Sections
 * Intuition: Two horizontal (or vertical) cuts that split rectangles into three non-empty groups exist iff the x-intervals (or y-intervals) merge into at least three disjoint blocks. Touching edges (`start == prevEnd`) do not overlap.
 * Approach: 1. Collect [startX, endX] and [startY, endY] for every rectangle. 2. Sort intervals and merge while `start < prevEnd`. 3. Valid if either axis yields ≥ 3 merged groups.
 * Dry Run: rectangles covering x [0,1],[1,2],[2,3] merge to 3 groups (touching only) → true. Overlapping [0,2],[1,3] merge to 1 group.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var checkValidCuts = function (n, rectangles) {
  const xIntervals = [];
  const yIntervals = [];
  for (const [startX, startY, endX, endY] of rectangles) {
    xIntervals.push([startX, endX]);
    yIntervals.push([startY, endY]);
  }
  return (
    Math.max(countMergedGroups(xIntervals), countMergedGroups(yIntervals)) >= 3
  );
};

function countMergedGroups(intervals) {
  intervals.sort(
    (leftInterval, rightInterval) => leftInterval[0] - rightInterval[0]
  );
  let groupCount = 0;
  let previousEnd = 0;
  for (const [intervalStart, intervalEnd] of intervals) {
    if (intervalStart < previousEnd) {
      previousEnd = Math.max(previousEnd, intervalEnd);
    } else {
      previousEnd = intervalEnd;
      groupCount++;
    }
  }
  return groupCount;
}

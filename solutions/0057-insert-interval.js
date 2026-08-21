/**
 * Insert Interval
 * Intuition: The list is already sorted and disjoint. Copy intervals that end before the new start, merge everything that overlaps the new interval, then append the rest.
 * Approach: 1. Push intervals whose end is strictly before newStart. 2. While an interval’s start is at most newEnd, expand newStart/newEnd to cover it. 3. Push the merged interval, then push remaining intervals.
 * Dry Run: intervals = [[1,3],[6,9]], newInterval = [2,5].
 *   - [1,3] overlaps [2,5] → merge to [1,5]. [6,9] starts after 5 → append. Result [[1,5],[6,9]].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var insert = function (intervals, newInterval) {
  const collectedIntervals = [];
  let currentIntervalIndex = 0;
  let newIntervalStart = newInterval[0];
  let newIntervalEnd = newInterval[1];
  const totalIntervalCount = intervals.length;

  while (
    currentIntervalIndex < totalIntervalCount &&
    intervals[currentIntervalIndex][1] < newIntervalStart
  ) {
    collectedIntervals.push(intervals[currentIntervalIndex]);
    currentIntervalIndex++;
  }

  while (
    currentIntervalIndex < totalIntervalCount &&
    intervals[currentIntervalIndex][0] <= newIntervalEnd
  ) {
    newIntervalStart = Math.min(
      newIntervalStart,
      intervals[currentIntervalIndex][0]
    );
    newIntervalEnd = Math.max(
      newIntervalEnd,
      intervals[currentIntervalIndex][1]
    );
    currentIntervalIndex++;
  }
  collectedIntervals.push([newIntervalStart, newIntervalEnd]);

  while (currentIntervalIndex < totalIntervalCount) {
    collectedIntervals.push(intervals[currentIntervalIndex]);
    currentIntervalIndex++;
  }

  return collectedIntervals;
};

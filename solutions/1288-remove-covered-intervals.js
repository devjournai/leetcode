/**
 * Remove Covered Intervals
 * Intuition: To efficiently count non-covered intervals, we can sort them first. A strategic sort order (by start ascending, then by end descending for ties) allows a single pass to identify intervals that extend beyond previously considered non-covered intervals, effectively filtering out those that are covered.
 * Approach: 1. Sort the input `intervals` array. The primary sort key is the interval's start value in ascending order. If two intervals have the same start value, the secondary sort key is the interval's end value in descending order. 2. Initialize a counter `uncoveredIntervalsCount` to 1, as the first interval in the sorted list is always considered uncovered initially. 3. Initialize a variable `currentMaxEnd` with the end value of the first interval in the sorted list. 4. Iterate through the sorted intervals starting from the second interval. 5. For each `currentProcessedInterval`, let its start be `processedIntervalStart` and its end be `processedIntervalEnd`. 6. If `processedIntervalEnd` is strictly greater than `currentMaxEnd`, it signifies that this interval is not covered by any previously encountered non-covered interval (because its end extends further than any previous non-covered interval's end). In this case, increment `uncoveredIntervalsCount` and update `currentMaxEnd` to `processedIntervalEnd`. 7. If `processedIntervalEnd` is less than or equal to `currentMaxEnd`, this interval is covered by a preceding interval that established the current `currentMaxEnd`. Do not modify `uncoveredIntervalsCount` or `currentMaxEnd`. 8. After iterating through all relevant intervals, return `uncoveredIntervalsCount`.
 * Dry Run: intervals = [[1,4],[3,6],[2,8]]
 * 1. Sort intervals: `[[1,4], [2,8], [3,6]]` (by start ascending, then end descending for ties).
 * 2. Initialize `uncoveredIntervalsCount = 1` (for `[1,4]`).
 * 3. Initialize `currentMaxEnd = 4` (from `[1,4]`).
 * 4. Iterate from the second interval:
 *    - `iterationIndex = 1`: `currentProcessedInterval = [2,8]`. `processedIntervalStart = 2`, `processedIntervalEnd = 8`.
 *      - `processedIntervalEnd` (8) > `currentMaxEnd` (4) is true.
 *      - `uncoveredIntervalsCount` becomes 2.
 *      - `currentMaxEnd` becomes 8.
 *    - `iterationIndex = 2`: `currentProcessedInterval = [3,6]`. `processedIntervalStart = 3`, `processedIntervalEnd = 6`.
 *      - `processedIntervalEnd` (6) > `currentMaxEnd` (8) is false.
 *      - `uncoveredIntervalsCount` remains 2.
 *      - `currentMaxEnd` remains 8.
 * 5. End of iteration.
 * 6. Return `uncoveredIntervalsCount` (2).
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var removeCoveredIntervals = function (intervals) {
  intervals.sort((leftInterval, rightInterval) => {
    if (leftInterval[0] !== rightInterval[0]) {
      return leftInterval[0] - rightInterval[0];
    }
    return rightInterval[1] - leftInterval[1];
  });

  let uncoveredIntervalsCount = 1;
  let currentMaxEnd = intervals[0][1];

  for (
    let iterationIndex = 1;
    iterationIndex < intervals.length;
    iterationIndex++
  ) {
    const currentProcessedInterval = intervals[iterationIndex];
    const processedIntervalEnd = currentProcessedInterval[1];

    if (processedIntervalEnd > currentMaxEnd) {
      uncoveredIntervalsCount++;
      currentMaxEnd = processedIntervalEnd;
    }
  }

  return uncoveredIntervalsCount;
};

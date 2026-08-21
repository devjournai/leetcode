/**
 * Employee Free Time
 * Intuition: Common free time is the gaps between everyone’s merged busy intervals, so flatten all `Interval`s, merge overlaps, then emit `[prev.end, next.start]`.
 * Approach: 1. Push every `singleWorkInterval` from `schedule` into `allEmployeeWorkIntervals`. 2. Sort by `.start`. 3. Merge into `mergedWorkingPeriods` when the last `.end` is ≥ the next `.start` (extend with `Math.max`). 4. For adjacent merged blocks, if `previousPeriod.end < nextPeriod.start`, push `new Interval(end, start)`. Return `freeGapResults`.
 * Dry Run: schedule = [[[1,2],[5,6]], [[1,3]], [[4,10]]].
 *   - Flattened/sorted: [1,2],[1,3],[4,10],[5,6] → merged [1,3] and [4,10].
 *   - Gap 3→4 → Interval(3,4). Return that one gap.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var employeeFreeTime = function (schedule) {
  const allEmployeeWorkIntervals = [];

  for (const individualEmployee of schedule) {
    for (const singleWorkInterval of individualEmployee) {
      allEmployeeWorkIntervals.push(singleWorkInterval);
    }
  }

  allEmployeeWorkIntervals.sort(
    (intervalOne, intervalTwo) => intervalOne.start - intervalTwo.start
  );

  const mergedWorkingPeriods = [];
  for (const currentWorkingBlock of allEmployeeWorkIntervals) {
    if (
      mergedWorkingPeriods.length === 0 ||
      mergedWorkingPeriods[mergedWorkingPeriods.length - 1].end <
        currentWorkingBlock.start
    ) {
      mergedWorkingPeriods.push(currentWorkingBlock);
    } else {
      mergedWorkingPeriods[mergedWorkingPeriods.length - 1].end = Math.max(
        mergedWorkingPeriods[mergedWorkingPeriods.length - 1].end,
        currentWorkingBlock.end
      );
    }
  }

  const freeGapResults = [];
  for (
    let periodIndex = 0;
    periodIndex < mergedWorkingPeriods.length - 1;
    periodIndex++
  ) {
    const previousPeriod = mergedWorkingPeriods[periodIndex];
    const nextPeriod = mergedWorkingPeriods[periodIndex + 1];
    if (previousPeriod.end < nextPeriod.start) {
      freeGapResults.push(new Interval(previousPeriod.end, nextPeriod.start));
    }
  }

  return freeGapResults;
};

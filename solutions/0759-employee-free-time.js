/**
 * Employee Free Time
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
    (intervalOne, intervalTwo) => intervalOne.start - intervalTwo.start,
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
        currentWorkingBlock.end,
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

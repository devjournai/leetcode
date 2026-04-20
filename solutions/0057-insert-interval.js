/**
 * Insert Interval
 * Time Complexity: O(N)
 * Space Complexity: O(N)
*/
var insert = function (intervals, newInterval) {
    const collectedIntervals = [];
    let currentIntervalIndex = 0;
    let newIntervalStart = newInterval[0];
    let newIntervalEnd = newInterval[1];
    const totalIntervalCount = intervals.length;

    while (currentIntervalIndex < totalIntervalCount && intervals[currentIntervalIndex][1] < newIntervalStart) {
        collectedIntervals.push(intervals[currentIntervalIndex]);
        currentIntervalIndex++;
    }

    while (currentIntervalIndex < totalIntervalCount && intervals[currentIntervalIndex][0] <= newIntervalEnd) {
        newIntervalStart = Math.min(newIntervalStart, intervals[currentIntervalIndex][0]);
        newIntervalEnd = Math.max(newIntervalEnd, intervals[currentIntervalIndex][1]);
        currentIntervalIndex++;
    }
    collectedIntervals.push([newIntervalStart, newIntervalEnd]);

    while (currentIntervalIndex < totalIntervalCount) {
        collectedIntervals.push(intervals[currentIntervalIndex]);
        currentIntervalIndex++;
    }

    return collectedIntervals;
};
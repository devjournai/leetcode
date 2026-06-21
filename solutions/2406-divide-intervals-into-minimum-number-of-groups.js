/**
 * Divide Intervals Into Minimum Number Of Groups
 * Intuition: The minimum number of groups required is equal to the maximum number of intervals that overlap at any single point in time.
 * Approach: 1. Convert each interval `[start, end]` into two event points: `[start, +1]` (interval starts) and `[end + 1, -1]` (interval ends after `end`). 2. Sort these event points primarily by time, and secondarily by type (process `+1` events before `-1` events for same time). 3. Iterate through the sorted events, maintaining a count of `currentActiveIntervals`. Update a `maxRequiredGroups` variable with the maximum value `currentActiveIntervals reaches`. 4. Return `maxRequiredGroups`.
 * Dry Run: intervals = [[5,10],[6,8],[1,7],[16,20]]
 *   1. Event Points: [[5,1], [11,-1], [6,1], [9,-1], [1,1], [8,-1], [16,1], [21,-1]]
 *   2. Sorted Events:
 *      [[1, 1], // currentActiveIntervals = 1, maxRequiredGroups = 1
 *       [5, 1], // currentActiveIntervals = 2, maxRequiredGroups = 2
 *       [6, 1], // currentActiveIntervals = 3, maxRequiredGroups = 3
 *       [8, -1], // currentActiveIntervals = 2, maxRequiredGroups = 3
 *       [9, -1], // currentActiveIntervals = 1, maxRequiredGroups = 3
 *       [11, -1], // currentActiveIntervals = 0, maxRequiredGroups = 3
 *       [16, 1], // currentActiveIntervals = 1, maxRequiredGroups = 3
 *       [21, -1]] // currentActiveIntervals = 0, maxRequiredGroups = 3
 *   3. Result: 3
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minGroups = function (intervalsInput) {
  const momentPoints = [];

  for (const intervalSingle of intervalsInput) {
    const startCoordinate = intervalSingle[0];
    const endCoordinate = intervalSingle[1];
    momentPoints.push([startCoordinate, 1]);
    momentPoints.push([endCoordinate + 1, -1]);
  }

  momentPoints.sort((eventA, eventB) => {
    const timeA = eventA[0];
    const timeB = eventB[0];
    const typeA = eventA[1];
    const typeB = eventB[1];

    if (timeA !== timeB) {
      return timeA - timeB;
    }
    return typeA - typeB;
  });

  let currentActiveIntervals = 0;
  let maxRequiredGroups = 0;

  for (const singleEvent of momentPoints) {
    const currentMoment = singleEvent[0];
    const changeType = singleEvent[1];

    currentActiveIntervals += changeType;
    maxRequiredGroups = Math.max(maxRequiredGroups, currentActiveIntervals);
  }

  return maxRequiredGroups;
};

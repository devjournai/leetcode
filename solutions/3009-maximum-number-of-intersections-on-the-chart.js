/**
 * Maximum Number Of Intersections On The Chart
 * Intuition: The problem asks for the maximum number of times a horizontal line can intersect the given chart. This can be modeled as finding the maximum number of overlapping vertical intervals. Each line segment `(k, y[k]) - (k+1, y[k+1])` defines a vertical interval on the y-axis. A horizontal line at some y-coordinate `H` intersects a segment if `H` falls within that segment's y-range. To handle precise integer coordinates and avoid floating point issues, all y-coordinates are scaled by 2. A sweep-line algorithm is then used: events are created at the start and end of each scaled interval, sorted, and swept through to track the maximum concurrent intervals.
 * Approach: 1. Initialize an empty map `verticalEventsMap` to store sweep-line events. 2. Iterate through `y` array from the second point (index 1) to `n-1` to consider each segment. For each segment connecting `y[segmentIterator]` and `y[segmentIterator - 1]`: 3. Calculate `scaledYOne` as `2 * y[segmentIterator - 1]`. 4. Determine `scaledYTwoAdjusted` based on whether it's the last segment (`segmentIterator === totalPoints - 1`) and the direction of the segment. If it's the last segment, `scaledYTwoAdjusted` is `2 * y[segmentIterator]`. Otherwise, if `y[segmentIterator]` is greater than `y[segmentIterator - 1]` (segment rises), `scaledYTwoAdjusted` is `2 * y[segmentIterator] - 1`. If `y[segmentIterator]` is less than `y[segmentIterator - 1]` (segment falls), `scaledYTwoAdjusted` is `2 * y[segmentIterator] + 1`. 5. Define the interval bounds `currentIntervalMin` and `currentIntervalMax` as `min(scaledYOne, scaledYTwoAdjusted)` and `max(scaledYOne, scaledYTwoAdjusted)` respectively. 6. Add events to `verticalEventsMap`: increment count at `currentIntervalMin` (interval start) and decrement count at `currentIntervalMax + 1` (interval end for half-open interval). 7. Convert the `verticalEventsMap` entries into an array `orderedEventsList` and sort it by coordinate. 8. Initialize `currentActiveCount = 0` and `maximumIntersectionCount = 0`. 9. Iterate through `orderedEventsList`. For each event `[eventCoordinate, countChange]`: update `currentActiveCount` by adding `countChange`. Update `maximumIntersectionCount` with `max(maximumIntersectionCount, currentActiveCount)`. 10. Return `maximumIntersectionCount`.
 * Dry Run: y = [0, 1, 0]
 *   totalPoints = 3
 *   verticalEventsMap = {}
 *
 *   segmentIterator = 1 (segment: y[0]=0 to y[1]=1)
 *     scaledYOne = 2 * 0 = 0
 *     scaledYTwoAdjusted = 2 * 1 - 1 = 1 (not last segment, rising)
 *     currentIntervalMin = 0, currentIntervalMax = 1
 *     verticalEventsMap: {0: 1, 2: -1} (at 1+1=2, -1 event)
 *
 *   segmentIterator = 2 (segment: y[1]=1 to y[2]=0) -> last segment as segmentIterator === totalPoints - 1
 *     scaledYOne = 2 * 1 = 2
 *     scaledYTwoAdjusted = 2 * 0 + 0 = 0 (last segment)
 *     currentIntervalMin = 0, currentIntervalMax = 2
 *     verticalEventsMap: {0: 1+1=2, 2: -1, 3: -1} (at 2+1=3, -1 event)
 *
 *   orderedEventsList = [[0, 2], [2, -1], [3, -1]] (sorted by coordinate)
 *   currentActiveCount = 0
 *   maximumIntersectionCount = 0
 *
 *   event: [0, 2]
 *     currentActiveCount = 0 + 2 = 2
 *     maximumIntersectionCount = max(0, 2) = 2
 *
 *   event: [2, -1]
 *     currentActiveCount = 2 + (-1) = 1
 *     maximumIntersectionCount = max(2, 1) = 2
 *
 *   event: [3, -1]
 *     currentActiveCount = 1 + (-1) = 0
 *     maximumIntersectionCount = max(2, 0) = 2
 *
 *   Return 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxIntersectionCount = function (y) {
  const totalPoints = y.length;
  const verticalEventsMap = new Map();

  for (
    let segmentIterator = 1;
    segmentIterator < totalPoints;
    segmentIterator++
  ) {
    const segmentPointPreviousY = y[segmentIterator - 1];
    const segmentPointCurrentY = y[segmentIterator];

    const scaledYOne = 2 * segmentPointPreviousY;
    let scaledYTwoAdjusted;

    if (segmentIterator === totalPoints - 1) {
      scaledYTwoAdjusted = 2 * segmentPointCurrentY;
    } else {
      if (segmentPointCurrentY > segmentPointPreviousY) {
        scaledYTwoAdjusted = 2 * segmentPointCurrentY - 1;
      } else {
        // segmentPointCurrentY < segmentPointPreviousY
        scaledYTwoAdjusted = 2 * segmentPointCurrentY + 1;
      }
    }

    const currentIntervalMin = Math.min(scaledYOne, scaledYTwoAdjusted);
    const currentIntervalMax = Math.max(scaledYOne, scaledYTwoAdjusted);

    verticalEventsMap.set(
      currentIntervalMin,
      (verticalEventsMap.get(currentIntervalMin) || 0) + 1
    );
    verticalEventsMap.set(
      currentIntervalMax + 1,
      (verticalEventsMap.get(currentIntervalMax + 1) || 0) - 1
    );
  }

  const orderedEventsList = [...verticalEventsMap.entries()].sort(
    (entryA, entryB) => entryA[0] - entryB[0]
  );
  let currentActiveCount = 0;
  let maximumIntersectionCount = 0;

  for (const [eventCoordinate, countChange] of orderedEventsList) {
    currentActiveCount += countChange;
    maximumIntersectionCount = Math.max(
      maximumIntersectionCount,
      currentActiveCount
    );
  }

  return maximumIntersectionCount;
};

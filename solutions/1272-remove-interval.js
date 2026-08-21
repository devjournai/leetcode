/**
 * Remove Interval
 * Intuition: Each interval either misses the removal range (keep whole), or is clipped into a left remnant and/or a right remnant.
 * Approach: 1. For each interval, if it is completely left or right of toBeRemoved, keep it. 2. Else if it starts before removedStart, push [start, removedStart]. 3. If it ends after removedEnd, push [removedEnd, end]. 4. Return resultIntervals.
 * Dry Run: intervals=[[0,2],[3,4],[5,7]], toBeRemoved=[1,6]
 *   [0,2] -> [0,1]; [3,4] fully covered drop; [5,7] -> [6,7]. Result [[0,1],[6,7]].
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var removeInterval = function (intervals, toBeRemoved) {
  const resultIntervals = [];
  const [removedStartPoint, removedEndPoint] = toBeRemoved;

  for (const processedInterval of intervals) {
    const currentIntervalStart = processedInterval[0];
    const currentIntervalEnd = processedInterval[1];

    if (
      currentIntervalEnd <= removedStartPoint ||
      currentIntervalStart >= removedEndPoint
    ) {
      resultIntervals.push([currentIntervalStart, currentIntervalEnd]);
    } else {
      if (currentIntervalStart < removedStartPoint) {
        const firstSegmentStart = currentIntervalStart;
        const firstSegmentEnd = removedStartPoint;
        resultIntervals.push([firstSegmentStart, firstSegmentEnd]);
      }

      if (currentIntervalEnd > removedEndPoint) {
        const secondSegmentStart = removedEndPoint;
        const secondSegmentEnd = currentIntervalEnd;
        resultIntervals.push([secondSegmentStart, secondSegmentEnd]);
      }
    }
  }

  return resultIntervals;
};

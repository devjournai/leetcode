/**
 * Remove Interval
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

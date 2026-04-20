/**
 * Minimum Time Visiting All Points
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minTimeToVisitAllPoints = function (points) {
  let totalElapsedSeconds = 0;

  for (
    let pointIterator = 0;
    pointIterator < points.length - 1;
    pointIterator++
  ) {
    let currentPosition = points[pointIterator];
    let nextDestination = points[pointIterator + 1];

    let deltaX = Math.abs(nextDestination[0] - currentPosition[0]);
    let deltaY = Math.abs(nextDestination[1] - currentPosition[1]);

    let timeForSegment = Math.max(deltaX, deltaY);
    totalElapsedSeconds += timeForSegment;
  }

  return totalElapsedSeconds;
};

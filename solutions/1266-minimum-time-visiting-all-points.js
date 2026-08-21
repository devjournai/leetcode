/**
 * Minimum Time Visiting All Points
 * Intuition: Chebyshev distance: diagonal moves cover both axes at once, so time between two points is max(|dx|,|dy|). Sum consecutive segments.
 * Approach: 1. For each adjacent pair compute abs deltas. 2. Add Math.max(deltaX, deltaY) to totalElapsedSeconds. 3. Return the total.
 * Dry Run: points = [[1,1],[3,4],[-1,0]]
 *   (1,1)->(3,4): max(2,3)=3. (3,4)->(-1,0): max(4,4)=4. Return 7.
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

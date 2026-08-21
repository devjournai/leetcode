/**
 * Find Nearest Point That Has The Same X Or Y Coordinate
 * Intuition: A valid point shares x or y with (x,y). Among those, pick the smallest Manhattan distance, breaking ties by smallest index via a left-to-right scan.
 * Approach: 1. Iterate `points.entries()`. 2. Skip points with neither coordinate matching. 3. If distance < `smallestManhattanDistance`, update distance and `bestPointIndex`. 4. Return the index or -1.
 * Dry Run: x=3, y=4, points = [[1,2],[3,1],[2,4],[2,3]].
 *   - Valid: (3,1) dist 3 index 1; (2,4) dist 1 index 2. Return 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var nearestValidPoint = function (x, y, points) {
  let smallestManhattanDistance = Infinity;
  let bestPointIndex = -1;

  for (const [currentPointIdx, pointEntry] of points.entries()) {
    const pointXCoord = pointEntry[0];
    const pointYCoord = pointEntry[1];

    if (pointXCoord === x || pointYCoord === y) {
      const calculatedDistance =
        Math.abs(pointXCoord - x) + Math.abs(pointYCoord - y);

      if (calculatedDistance < smallestManhattanDistance) {
        smallestManhattanDistance = calculatedDistance;
        bestPointIndex = currentPointIdx;
      }
    }
  }

  return bestPointIndex;
};

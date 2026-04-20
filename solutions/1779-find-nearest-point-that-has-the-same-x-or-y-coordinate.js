/**
 * Find Nearest Point That Has The Same X Or Y Coordinate
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

/**
 * Queries On Number Of Points Inside A Circle
 * Time Complexity: O(M * N)
 * Space Complexity: O(M)
 */
var countPoints = function (points, queries) {
  const answerCollection = [];
  const numberOfQueries = queries.length;
  const numberOfPoints = points.length;

  for (let queryIndex = 0; queryIndex < numberOfQueries; queryIndex++) {
    const currentQuery = queries[queryIndex];
    const queryXCoordinate = currentQuery[0];
    const queryYCoordinate = currentQuery[1];
    const queryRadius = currentQuery[2];
    const queryRadiusSquared = queryRadius * queryRadius;

    let pointsInsideCurrentCircle = 0;

    for (let pointIndex = 0; pointIndex < numberOfPoints; pointIndex++) {
      const currentPoint = points[pointIndex];
      const pointXCoordinate = currentPoint[0];
      const pointYCoordinate = currentPoint[1];

      const deltaX = queryXCoordinate - pointXCoordinate;
      const deltaY = queryYCoordinate - pointYCoordinate;
      const distanceSquared = deltaX * deltaX + deltaY * deltaY;

      if (distanceSquared <= queryRadiusSquared) {
        pointsInsideCurrentCircle++;
      }
    }
    answerCollection.push(pointsInsideCurrentCircle);
  }

  return answerCollection;
};

/**
 * Maximum Number Of Visible Points
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var visiblePoints = function (points, angle, location) {
  const calculatedAnglesList = [];
  let pointsAtOriginCount = 0;

  const locationAnchorX = location[0];
  const locationAnchorY = location[1];

  for (const pointCoordinate of points) {
    const currentPointXCoordinate = pointCoordinate[0];
    const currentPointYCoordinate = pointCoordinate[1];

    if (
      currentPointXCoordinate === locationAnchorX &&
      currentPointYCoordinate === locationAnchorY
    ) {
      pointsAtOriginCount++;
      continue;
    }

    const pointDeltaY = currentPointYCoordinate - locationAnchorY;
    const pointDeltaX = currentPointXCoordinate - locationAnchorX;

    const pointAngleInRadians = Math.atan2(pointDeltaY, pointDeltaX);
    const pointAngleInDegrees = (pointAngleInRadians * 180) / Math.PI;

    calculatedAnglesList.push(pointAngleInDegrees);
    calculatedAnglesList.push(pointAngleInDegrees + 360);
  }

  calculatedAnglesList.sort((degA, degB) => degA - degB);

  let maximumPointsWithinAngle = 0;
  let windowStartIndex = 0;

  for (
    let windowEndIndex = 0;
    windowEndIndex < calculatedAnglesList.length;
    windowEndIndex++
  ) {
    while (
      calculatedAnglesList[windowEndIndex] -
        calculatedAnglesList[windowStartIndex] >
      angle
    ) {
      windowStartIndex++;
    }
    maximumPointsWithinAngle = Math.max(
      maximumPointsWithinAngle,
      windowEndIndex - windowStartIndex + 1,
    );
  }

  return maximumPointsWithinAngle + pointsAtOriginCount;
};

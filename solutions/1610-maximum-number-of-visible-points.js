/**
 * Maximum Number Of Visible Points
 * Intuition: From the location, visibility is a sliding window over polar angles of width `angle`. Duplicate angles plus 360° so the window can wrap around the circle. Points at the origin are always visible.
 * Approach: 1. Count origin points and skip them. 2. Push atan2 degrees and degrees+360 for every other point. 3. Sort angles. 4. Two-pointer window: advance start while end-start > angle; track max window size. 5. Add origin count.
 * Dry Run: points = [[2,1],[2,2],[3,3]], angle=90, location=[1,1].
 *   - Angles ~0°, 45°, 45°. Window of 90° covers all 3 → 3.
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
      windowEndIndex - windowStartIndex + 1
    );
  }

  return maximumPointsWithinAngle + pointsAtOriginCount;
};

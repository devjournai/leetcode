/**
 * Max Points On A Line
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
*/
var maxPoints = function (points) {
  const pointsArrayLength = points.length;
  if (pointsArrayLength <= 2) {
    return pointsArrayLength;
  }

  let globalMaximumPoints = 0;

  for (let pivotIndex = 0; pivotIndex < pointsArrayLength; pivotIndex++) {
    const currentPivotPoint = points[pivotIndex];
    const slopeRegistry = new Map();
    let identicalCoordinatePoints = 1;
    let verticalLinePoints = 0;

    for (let otherPointIndex = pivotIndex + 1; otherPointIndex < pointsArrayLength; otherPointIndex++) {
      const comparedPoint = points[otherPointIndex];

      const deltaXValue = comparedPoint[0] - currentPivotPoint[0];
      const deltaYValue = comparedPoint[1] - currentPivotPoint[1];

      if (deltaXValue === 0 && deltaYValue === 0) {
        identicalCoordinatePoints++;
        continue;
      }

      if (deltaXValue === 0) {
        verticalLinePoints++;
        continue;
      }

      const calculatedSlope = deltaYValue / deltaXValue;
      const currentSlopeCount = (slopeRegistry.get(calculatedSlope) || 0) + 1;
      slopeRegistry.set(calculatedSlope, currentSlopeCount);
    }

    let currentPivotMax = 0;
    for (const countedPoints of slopeRegistry.values()) {
      currentPivotMax = Math.max(currentPivotMax, countedPoints);
    }

    currentPivotMax = Math.max(currentPivotMax, verticalLinePoints);
    globalMaximumPoints = Math.max(globalMaximumPoints, currentPivotMax + identicalCoordinatePoints);
  }

  return globalMaximumPoints;
};
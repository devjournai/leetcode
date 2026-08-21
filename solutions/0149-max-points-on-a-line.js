/**
 * Max Points On A Line
 * Intuition: For a fixed pivot, every other point lies on a unique slope (or a vertical line, or coincides). The largest slope group plus duplicates at the pivot is the best line through that pivot; take the max over pivots.
 * Approach: 1. If `pointsArrayLength <= 2`, return that length. 2. For each `pivotIndex`, reset `slopeRegistry`, `identicalCoordinatePoints = 1`, `verticalLinePoints = 0`. 3. For later `otherPointIndex`, compute `deltaXValue`/`deltaYValue`. 4. If both zero, increment identicals; if `deltaXValue === 0`, increment verticals; else count `deltaYValue / deltaXValue` in the map. 5. Max of slope counts and verticals, plus identicals, update `globalMaximumPoints`. 6. Return it.
 * Dry Run: points = [[1,1],[2,2],[3,3]]
 * Pivot (1,1): slopes 1 and 1 → two others on slope 1; identical=1 → 3
 * Result: 3
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

    for (
      let otherPointIndex = pivotIndex + 1;
      otherPointIndex < pointsArrayLength;
      otherPointIndex++
    ) {
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
    globalMaximumPoints = Math.max(
      globalMaximumPoints,
      currentPivotMax + identicalCoordinatePoints
    );
  }

  return globalMaximumPoints;
};

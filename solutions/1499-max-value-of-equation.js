/**
 * Max Value Of Equation
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var findMaxValueOfEquation = function (points, k) {
  let maximumPossibleValue = Number.NEGATIVE_INFINITY;
  const coordinateQueue = [];

  for (let pointIndex = 0; pointIndex < points.length; pointIndex++) {
    const currentPointX = points[pointIndex][0];
    const currentPointY = points[pointIndex][1];

    while (true) {
      if (coordinateQueue.length === 0) break;
      const firstQueueIndex = coordinateQueue[0];
      const firstQueuePointX = points[firstQueueIndex][0];
      if (currentPointX - firstQueuePointX <= k) break;
      coordinateQueue.shift();
    }

    if (coordinateQueue.length > 0) {
      const bestPreviousIndex = coordinateQueue[0];
      const bestPreviousX = points[bestPreviousIndex][0];
      const bestPreviousY = points[bestPreviousIndex][1];
      const currentEquationValue =
        bestPreviousY + currentPointY + currentPointX - bestPreviousX;
      maximumPossibleValue = Math.max(
        maximumPossibleValue,
        currentEquationValue,
      );
    }

    while (true) {
      if (coordinateQueue.length === 0) break;
      const lastQueueIndex = coordinateQueue[coordinateQueue.length - 1];
      const lastQueuePointValue =
        points[lastQueueIndex][1] - points[lastQueueIndex][0];
      const currentPointValue = currentPointY - currentPointX;
      if (lastQueuePointValue > currentPointValue) break;
      coordinateQueue.pop();
    }

    coordinateQueue.push(pointIndex);
  }

  return maximumPossibleValue;
};

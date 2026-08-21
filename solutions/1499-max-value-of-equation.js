/**
 * Max Value Of Equation
 * Intuition: For i < j, yi+yj+|xi-xj| = yj+xj + (yi-xi) when points are sorted by x. A deque stores candidates with decreasing (y-x) and x within k of the current point.
 * Approach: 1. Scan points left to right. 2. Drop deque front if x-distance > k. 3. If deque non-empty, update max with yj+yi+xj-xi using the front. 4. Pop back worse (y-x) values and push the current index.
 * Dry Run: points = [[1,3],[2,0],[5,10],[6,-10]], k = 1
 *   - pairs with |dx|<=1: (1,2) value 4; (5,6) value 13. Return 13.
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
        currentEquationValue
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

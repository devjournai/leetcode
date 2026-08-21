/**
 * Line Reflection
 * Intuition: If a vertical mirror exists it must sit at the midpoint of the min and max x, so every point `(x, y)` needs its partner `(minX + maxX - x, y)` in the set.
 * Approach: 1. Empty input is true. 2. Store `"x,y"` keys in a Set. 3. Scan for min/max x and set `combinedXRangeSum = min + max`. 4. Every point must have `${sum - x},${y}` in the set.
 * Dry Run: [[1,1],[1,-1],[-1,1],[-1,-1]] → min+max = 0; each (x,y) has (-x,y) in the set → true.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var isReflected = function (points) {
  if (points.length === 0) {
    return true;
  }

  const pointStringRepresentationSet = new Set(
    points.map((currentPointItem) => {
      const itemXComponent = currentPointItem[0];
      const itemYComponent = currentPointItem[1];
      return `${itemXComponent},${itemYComponent}`;
    })
  );

  let minimumXCoordinate = Infinity;
  let maximumXCoordinate = -Infinity;

  points.forEach((currentBoundaryPoint) => {
    const xValueForBoundary = currentBoundaryPoint[0];
    minimumXCoordinate = Math.min(minimumXCoordinate, xValueForBoundary);
    maximumXCoordinate = Math.max(maximumXCoordinate, xValueForBoundary);
  });

  const combinedXRangeSum = minimumXCoordinate + maximumXCoordinate;

  const allSymmetricPairsExist = points.every((currentCheckPoint) => {
    const checkXCoordinate = currentCheckPoint[0];
    const checkYCoordinate = currentCheckPoint[1];

    const mirroredXCoordinate = combinedXRangeSum - checkXCoordinate;
    const requiredSymmetricKey = `${mirroredXCoordinate},${checkYCoordinate}`;

    return pointStringRepresentationSet.has(requiredSymmetricKey);
  });

  return allSymmetricPairsExist;
};

/**
 * Convex Polygon
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var isConvex = function (points) {
  const pointCount = points.length;
  let lastValidSign = 0;
  let loopIndex = 0;

  while (loopIndex < pointCount) {
    const vertexA = points[loopIndex];
    const vertexB = points[(loopIndex + 1) % pointCount];
    const vertexC = points[(loopIndex + 2) % pointCount];

    const deltaXA = vertexB[0] - vertexA[0];
    const deltaYA = vertexB[1] - vertexA[1];

    const deltaXB = vertexC[0] - vertexB[0];
    const deltaYB = vertexC[1] - vertexB[1];

    const computedCrossProduct = deltaXA * deltaYB - deltaYA * deltaXB;
    const computedTurnSign = Math.sign(computedCrossProduct);

    if (computedTurnSign === 0) {

    } else {
      if (lastValidSign !== 0 && computedTurnSign !== lastValidSign) {
        return false;
      }
      lastValidSign = computedTurnSign;
    }

    loopIndex++;
  }

  return true;
};
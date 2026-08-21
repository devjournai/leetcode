/**
 * Convex Polygon
 * Intuition: A polygon is convex iff every turn around the boundary has the same orientation (all left or all right). Collinear edges (cross product 0) do not count as a turn.
 * Approach: 1. For each vertex i take points i, i+1, i+2 (mod n). 2. Cross product of edges AB and BC: `deltaXA * deltaYB - deltaYA * deltaXB`. 3. `Math.sign` is the turn; skip 0. 4. If a nonzero turn disagrees with `lastValidSign`, return false; otherwise remember it. 5. If the loop finishes, return true.
 * Dry Run: points = [[0,0],[0,1],[1,1],[1,0]] (square).
 *   - Each consecutive triple has cross product with the same sign (right turns) → true.
 *   - A dent that flips one cross-product sign returns false immediately.
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

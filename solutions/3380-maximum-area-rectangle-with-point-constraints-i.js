/**
 * Maximum Area Rectangle With Point Constraints I
 * Intuition: An axis-aligned rectangle is four corners from the point set. It is valid only when no other point lies inside or on the border.
 * Approach: 1. Index points in a set. 2. Try every pair of points as opposite corners (different x and y). 3. If the other two corners exist, scan all points and reject any that lie in the closed rectangle except the four corners. 4. Track the maximum area, or -1.
 * Dry Run: points = [[1,1],[1,3],[3,1],[3,3],[2,2]].
 *   - Corners (1,1) and (3,3) form a rectangle but (2,2) is inside → invalid.
 *   - No empty rectangle → -1.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N)
 */

var maxRectangleArea = function (points) {
  const pointKeySet = new Set(points.map(([x, y]) => x + "," + y));
  let maximumArea = -1;
  const pointCount = points.length;

  for (let firstIndex = 0; firstIndex < pointCount; firstIndex++) {
    for (
      let secondIndex = firstIndex + 1;
      secondIndex < pointCount;
      secondIndex++
    ) {
      const [firstX, firstY] = points[firstIndex];
      const [secondX, secondY] = points[secondIndex];
      if (firstX === secondX || firstY === secondY) {
        continue;
      }
      if (
        !pointKeySet.has(firstX + "," + secondY) ||
        !pointKeySet.has(secondX + "," + firstY)
      ) {
        continue;
      }

      const minX = Math.min(firstX, secondX);
      const maxX = Math.max(firstX, secondX);
      const minY = Math.min(firstY, secondY);
      const maxY = Math.max(firstY, secondY);
      let rectangleIsEmpty = true;

      for (const [pointX, pointY] of points) {
        const isCorner =
          (pointX === minX || pointX === maxX) &&
          (pointY === minY || pointY === maxY);
        if (isCorner) {
          continue;
        }
        if (
          pointX >= minX &&
          pointX <= maxX &&
          pointY >= minY &&
          pointY <= maxY
        ) {
          rectangleIsEmpty = false;
          break;
        }
      }

      if (rectangleIsEmpty) {
        maximumArea = Math.max(maximumArea, (maxX - minX) * (maxY - minY));
      }
    }
  }

  return maximumArea;
};

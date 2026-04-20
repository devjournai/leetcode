/**
 * Projection Area Of 3d Shapes
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var projectionArea = function (grid) {
  const gridSideLength = grid.length;
  let areaTop = 0;
  let areaSide = 0;
  let columnMaximumsTracker = new Array(gridSideLength).fill(0);

  for (let rowIterator = 0; rowIterator < gridSideLength; rowIterator++) {
    let currentMaximumInRow = 0;
    for (let colIterator = 0; colIterator < gridSideLength; colIterator++) {
      const cellHeight = grid[rowIterator][colIterator];

      if (cellHeight > 0) {
        areaTop++;
      }

      currentMaximumInRow = Math.max(currentMaximumInRow, cellHeight);
      columnMaximumsTracker[colIterator] = Math.max(
        columnMaximumsTracker[colIterator],
        cellHeight,
      );
    }
    areaSide += currentMaximumInRow;
  }

  let areaFront = 0;
  for (let columnMaximumValue of columnMaximumsTracker) {
    areaFront += columnMaximumValue;
  }

  return areaTop + areaFront + areaSide;
};

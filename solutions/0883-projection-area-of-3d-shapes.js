/**
 * Projection Area Of 3d Shapes
 * Intuition: Top view counts cells with height > 0. Side (yz) is the max of each row; front (xz) is the max of each column. Sum the three projections.
 * Approach: 1. For each cell, if `cellHeight > 0` increment `areaTop`; track row max and update `columnMaximumsTracker[col]`. 2. Add each row max to `areaSide`. 3. Sum column maxima into `areaFront`. 4. Return `areaTop + areaFront + areaSide`.
 * Dry Run: grid = [[1,2],[3,4]].
 *   - Top 4. Row maxes 2+4=6. Col maxes 3+4=7. Return 17.
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
        cellHeight
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

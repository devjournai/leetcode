/**
* Sum Of Remoteness Of All Cells
* Intuition: Remoteness R[i][j] for a cell (i, j) is the sum of values of all other non-blocked cells not connected to (i, j). If (i, j) is part of a connected component C, then cells not connected to (i, j) are exactly those non-blocked cells outside of C.
* Approach: 1. Calculate `totalSumOfAllValidCells` by summing all positive values in the grid. 2. Create a deep copy of the grid for in-place modification during component traversal. 3. Iterate through the grid copy using a distinct iteration method. For each unvisited, non-blocked cell, initiate a Depth-First Search (DFS) to find its connected component. 4. The DFS function will mark visited cells, sum their values (`componentSum`), and count them (`componentCount`). 5. For each component found, calculate its contribution to the total remoteness as `(totalSumOfAllValidCells - componentSum) * componentCount` and add it to a running `finalOverallSum`. 6. Return `finalOverallSum`.
* Dry Run: For grid = [[1,1],[1,-1]]:
  1. `matrixRows`=2, `matrixCols`=2.
  2. `movementVectors` initialized.
  3. `totalAccessibleSum` calculation (using nested `for` loops):
 - (0,0): val=1, `totalAccessibleSum`=1
 - (0,1): val=1, `totalAccessibleSum`=2
 - (1,0): val=1, `totalAccessibleSum`=3
 - (1,1): val=-1, `totalAccessibleSum` remains 3.
 - Result: `totalAccessibleSum` = 3.
  4. `temporaryGrid` = [[1,1],[1,-1]] (deep copy).
  5. `finalResultAccumulator` = 0.
  6. Iterate `temporaryGrid` using nested `forEach` loops:
 - (0,0): `currentPointValue`=1. Is `>0`. Initiate DFS.
   - `traverseComponent(0,0, temporaryGrid, 2, 2, movementVectors)`:
 - `elementValue`=1. `mutableGridRef[0][0]` set to -1. `[[-1,1],[1,-1]]`.
 - `currentCompSum`=1, `currentCompCount`=1.
 - Neighbors of (0,0) (using `for...of` loop for `movementOptions`):
   - (0,1): `mutableGridRef[0][1]`=1 (>0). Recursive call: `traverseComponent(0,1,...)`.
 - `elementValue`=1. `mutableGridRef[0][1]` set to -1. `[[-1,-1],[1,-1]]`.
 - `currentCompSum`=1, `currentCompCount`=1.
 - Neighbors of (0,1): (0,0) is -1 (visited), (1,1) is -1 (blocked). Returns `[1,1]`.
 - `recursiveSum`=1, `recursiveCount`=1. `currentCompSum`=1+1=2. `currentCompCount`=1+1=2.
   - (1,0): `mutableGridRef[1][0]`=1 (>0). Recursive call: `traverseComponent(1,0,...)`.
 - `elementValue`=1. `mutableGridRef[1][0]` set to -1. `[[-1,-1],[-1,-1]]`.
 - `currentCompSum`=1, `currentCompCount`=1.
 - Neighbors of (1,0): (0,0) is -1 (visited), (1,1) is -1 (blocked). Returns `[1,1]`.
 - `recursiveSum`=1, `recursiveCount`=1. `currentCompSum`=2+1=3. `currentCompCount`=2+1=3.
 - DFS for (0,0) returns `[3,3]`.
   - `componentDetails` = `[3,3]`. `componentSumTotal`=3, `componentCellCount`=3.
   - `finalResultAccumulator += (3 - 3) * 3 = 0`. `finalResultAccumulator`=0.
 - (0,1): `currentPointValue`=-1 (visited). Skip.
 - (1,0): `currentPointValue`=-1 (visited). Skip.
 - (1,1): `currentPointValue`=-1 (blocked). Skip.
  7. Return `finalResultAccumulator` = 0.
* Time Complexity: O(N*M)
* Space Complexity: O(N*M)
*/
var sumRemoteness = function (gridParam) {
  const matrixRows = gridParam.length;
  const matrixCols = gridParam[0].length;
  const movementVectors = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let totalAccessibleSum = 0;
  for (
    let firstRowIterator = 0;
    firstRowIterator < matrixRows;
    firstRowIterator++
  ) {
    for (
      let firstColIterator = 0;
      firstColIterator < matrixCols;
      firstColIterator++
    ) {
      const cellValuePrimary = gridParam[firstRowIterator][firstColIterator];
      totalAccessibleSum += Math.max(cellValuePrimary, 0);
    }
  }

  const temporaryGrid = gridParam.map((rowContent) => [...rowContent]);

  let finalResultAccumulator = 0;

  const traverseComponent = (
    dfsCoordX,
    dfsCoordY,
    mutableGridRef,
    gridRowsCount,
    gridColsCount,
    movementOptions
  ) => {
    if (
      dfsCoordX < 0 ||
      dfsCoordX >= gridRowsCount ||
      dfsCoordY < 0 ||
      dfsCoordY >= gridColsCount ||
      mutableGridRef[dfsCoordX][dfsCoordY] < 0
    ) {
      return [0, 0];
    }

    const elementValue = mutableGridRef[dfsCoordX][dfsCoordY];
    mutableGridRef[dfsCoordX][dfsCoordY] = -1;

    let currentCompSum = elementValue;
    let currentCompCount = 1;

    for (const directionPair of movementOptions) {
      const deltaX = directionPair[0];
      const deltaY = directionPair[1];
      const nextCellX = dfsCoordX + deltaX;
      const nextCellY = dfsCoordY + deltaY;

      const componentDfsResult = traverseComponent(
        nextCellX,
        nextCellY,
        mutableGridRef,
        gridRowsCount,
        gridColsCount,
        movementOptions
      );
      const recursiveSum = componentDfsResult[0];
      const recursiveCount = componentDfsResult[1];
      currentCompSum += recursiveSum;
      currentCompCount += recursiveCount;
    }

    return [currentCompSum, currentCompCount];
  };

  temporaryGrid.forEach((gridRowContents, gridRowCoordinate) => {
    gridRowContents.forEach((currentPointValue, gridColCoordinate) => {
      if (currentPointValue > 0) {
        const componentDetails = traverseComponent(
          gridRowCoordinate,
          gridColCoordinate,
          temporaryGrid,
          matrixRows,
          matrixCols,
          movementVectors
        );
        const componentSumTotal = componentDetails[0];
        const componentCellCount = componentDetails[1];
        finalResultAccumulator +=
          (totalAccessibleSum - componentSumTotal) * componentCellCount;
      }
    });
  });

  return finalResultAccumulator;
};

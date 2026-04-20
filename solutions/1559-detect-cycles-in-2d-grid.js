/**
 * Detect Cycles In 2d Grid
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var containsCycle = function (grid) {
  const gridHeight = grid.length;
  const gridWidth = grid[0].length;
  const visitedCoordinates = new Set();

  const directionShifts = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  for (let currentGridRow = 0; currentGridRow < gridHeight; currentGridRow++) {
    for (let currentGridCol = 0; currentGridCol < gridWidth; currentGridCol++) {
      const currentCellIdentifier = `${currentGridRow},${currentGridCol}`;

      if (!visitedCoordinates.has(currentCellIdentifier)) {
        const componentTraversalQueue = [];
        componentTraversalQueue.push([currentGridRow, currentGridCol, -1, -1]);

        let queuePointer = 0;
        visitedCoordinates.add(currentCellIdentifier);

        while (queuePointer < componentTraversalQueue.length) {
          const currentCellData = componentTraversalQueue[queuePointer++];
          const cellVertexRow = currentCellData[0];
          const cellVertexCol = currentCellData[1];
          const cellParentRow = currentCellData[2];
          const cellParentCol = currentCellData[3];
          const targetCharValue = grid[cellVertexRow][cellVertexCol];

          for (const offsetTuple of directionShifts) {
            const deltaX = offsetTuple[0];
            const deltaY = offsetTuple[1];
            const nextCellRow = cellVertexRow + deltaX;
            const nextCellCol = cellVertexCol + deltaY;

            if (
              nextCellRow === cellParentRow &&
              nextCellCol === cellParentCol
            ) {
              continue;
            }

            if (
              nextCellRow < 0 ||
              nextCellRow >= gridHeight ||
              nextCellCol < 0 ||
              nextCellCol >= gridWidth
            ) {
              continue;
            }

            if (grid[nextCellRow][nextCellCol] !== targetCharValue) {
              continue;
            }

            const nextCellIdentifier = `${nextCellRow},${nextCellCol}`;

            if (visitedCoordinates.has(nextCellIdentifier)) {
              return true;
            } else {
              visitedCoordinates.add(nextCellIdentifier);
              componentTraversalQueue.push([
                nextCellRow,
                nextCellCol,
                cellVertexRow,
                cellVertexCol,
              ]);
            }
          }
        }
      }
    }
  }

  return false;
};

/**
 * Path With Minimum Effort
 * Time Complexity: O(rows * cols * log(maxHeightDifference))
 * Space Complexity: O(rows * cols)
 */
var minimumEffortPath = function (heights) {
  const totalRows = heights.length;
  const totalColumns = heights[0].length;

  const findPathBFS = (maximumAllowedEffort) => {
    const pathVisited = Array.from({ length: totalRows }, () =>
      Array(totalColumns).fill(false),
    );
    const cellsToExplore = [[0, 0]];
    pathVisited[0][0] = true;

    const moveDirections = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    let currentQueuePointer = 0;

    while (currentQueuePointer < cellsToExplore.length) {
      const currentCell = cellsToExplore[currentQueuePointer++];
      const currentCellRow = currentCell[0];
      const currentCellColumn = currentCell[1];

      if (
        currentCellRow === totalRows - 1 &&
        currentCellColumn === totalColumns - 1
      ) {
        return true;
      }

      for (const directionDelta of moveDirections) {
        const nextCellRow = currentCellRow + directionDelta[0];
        const nextCellColumn = currentCellColumn + directionDelta[1];

        const isRowValid = nextCellRow >= 0 && nextCellRow < totalRows;
        const isColumnValid =
          nextCellColumn >= 0 && nextCellColumn < totalColumns;

        if (
          isRowValid &&
          isColumnValid &&
          !pathVisited[nextCellRow][nextCellColumn]
        ) {
          const heightDifference = Math.abs(
            heights[nextCellRow][nextCellColumn] -
              heights[currentCellRow][currentCellColumn],
          );
          if (heightDifference <= maximumAllowedEffort) {
            pathVisited[nextCellRow][nextCellColumn] = true;
            cellsToExplore.push([nextCellRow, nextCellColumn]);
          }
        }
      }
    }
    return false;
  };

  let binarySearchStart = 0;
  let binarySearchEnd = 1000000;
  let minimumEffortResult = binarySearchEnd;

  while (binarySearchStart <= binarySearchEnd) {
    const midEffortValue = Math.floor(
      (binarySearchStart + binarySearchEnd) / 2,
    );
    if (findPathBFS(midEffortValue)) {
      minimumEffortResult = midEffortValue;
      binarySearchEnd = midEffortValue - 1;
    } else {
      binarySearchStart = midEffortValue + 1;
    }
  }

  return minimumEffortResult;
};

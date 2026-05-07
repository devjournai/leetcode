/**
 * Count Sub Islands
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var countSubIslands = function (grid1, grid2) {
  const totalRows = grid1.length;
  const totalCols = grid1[0].length;
  let subIslandCount = 0;

  let currentRowIndex = 0;
  while (currentRowIndex < totalRows) {
    let currentColIndex = 0;
    while (currentColIndex < totalCols) {
      if (grid2[currentRowIndex][currentColIndex] === 1) {
        let isCandidateSubIsland = true;
        const islandQueue = [];
        islandQueue.push([currentRowIndex, currentColIndex]);
        grid2[currentRowIndex][currentColIndex] = 0;

        if (grid1[currentRowIndex][currentColIndex] === 0) {
          isCandidateSubIsland = false;
        }

        const deltaRows = [-1, 1, 0, 0];
        const deltaCols = [0, 0, -1, 1];

        while (islandQueue.length > 0) {
          const [queueFrontRow, queueFrontCol] = islandQueue.shift();

          for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            const nextRow = queueFrontRow + deltaRows[directionIndex];
            const nextCol = queueFrontCol + deltaCols[directionIndex];

            if (
              nextRow >= 0 &&
              nextRow < totalRows &&
              nextCol >= 0 &&
              nextCol < totalCols &&
              grid2[nextRow][nextCol] === 1
            ) {
              grid2[nextRow][nextCol] = 0;
              islandQueue.push([nextRow, nextCol]);

              if (grid1[nextRow][nextCol] === 0) {
                isCandidateSubIsland = false;
              }
            }
          }
        }

        if (isCandidateSubIsland) {
          subIslandCount++;
        }
      }
      currentColIndex++;
    }
    currentRowIndex++;
  }

  return subIslandCount;
};

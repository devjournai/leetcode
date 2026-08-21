/**
 * Max Area Of Island
 * Intuition: Each connected 4-direction block of 1s is an island. BFS from every unvisited land cell counts its size; track the max.
 * Approach: 1. Scan cells. 2. On land not in `visitedCellsTracker`, BFS with `bfsQueue`/`queuePointer`, 4-dir `rowDirections`/`colDirections`. 3. Increment `currentIslandSize` per dequeued cell. 4. Update `maximumIslandArea`.
 * Dry Run: grid=[[0,0,1,0,0],[1,1,1,0,0]]. Start (0,2) size 1 then BFS to (1,2) then (1,1),(1,0) → size 4.
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var maxAreaOfIsland = function (grid) {
  const totalRows = grid.length;
  if (totalRows === 0) {
    return 0;
  }
  const totalCols = grid[0].length;

  let maximumIslandArea = 0;
  const visitedCellsTracker = new Set();

  const rowDirections = [0, 0, 1, -1];
  const colDirections = [1, -1, 0, 0];

  for (let rowIndexIter = 0; rowIndexIter < totalRows; rowIndexIter++) {
    for (let colIndexIter = 0; colIndexIter < totalCols; colIndexIter++) {
      const currentCellKey = `${rowIndexIter},${colIndexIter}`;

      if (
        grid[rowIndexIter][colIndexIter] === 1 &&
        !visitedCellsTracker.has(currentCellKey)
      ) {
        let currentIslandSize = 0;
        const bfsQueue = [[rowIndexIter, colIndexIter]];
        visitedCellsTracker.add(currentCellKey);

        let queuePointer = 0;
        while (queuePointer < bfsQueue.length) {
          const [currentRowCoord, currentColCoord] = bfsQueue[queuePointer];
          queuePointer++;
          currentIslandSize++;

          for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
            const nextRowCoord =
              currentRowCoord + rowDirections[directionIndex];
            const nextColCoord =
              currentColCoord + colDirections[directionIndex];
            const nextCellKey = `${nextRowCoord},${nextColCoord}`;

            const isValidRow = nextRowCoord >= 0 && nextRowCoord < totalRows;
            const isValidCol = nextColCoord >= 0 && nextColCoord < totalCols;

            if (
              isValidRow &&
              isValidCol &&
              grid[nextRowCoord][nextColCoord] === 1 &&
              !visitedCellsTracker.has(nextCellKey)
            ) {
              visitedCellsTracker.add(nextCellKey);
              bfsQueue.push([nextRowCoord, nextColCoord]);
            }
          }
        }
        maximumIslandArea = Math.max(maximumIslandArea, currentIslandSize);
      }
    }
  }

  return maximumIslandArea;
};

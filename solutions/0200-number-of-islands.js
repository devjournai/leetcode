/**
 * Number Of Islands
 * Intuition: Each unvisited '1' starts a new island. Flood-fill (BFS) marks the whole connected land as '0' so it is not counted again.
 * Approach: 1. Scan every cell. 2. On '1', increment the island count, enqueue the cell, and set it to '0'. 3. While the queue is non-empty, visit 4-neighbors; enqueue and sink any in-bound '1'. 4. Return the count.
 * Dry Run: grid = [["1","1"],["0","1"]].
 *   - [0][0] is '1' → count=1; BFS sinks [0][0] and [0][1] then [1][1].
 *   - Remaining cells are '0'. Return 1.
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
var numIslands = function (grid) {
  let numberOfIslandsFound = 0;
  const totalRows = grid.length;
  if (totalRows === 0) {
    return 0;
  }
  const totalCols = grid[0].length;

  for (let currentGridRow = 0; currentGridRow < totalRows; currentGridRow++) {
    for (let currentGridCol = 0; currentGridCol < totalCols; currentGridCol++) {
      if (grid[currentGridRow][currentGridCol] === "1") {
        numberOfIslandsFound++;

        let coordinateQueue = [];
        coordinateQueue.push([currentGridRow, currentGridCol]);
        grid[currentGridRow][currentGridCol] = "0";

        const movementDirections = [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
        ];

        while (coordinateQueue.length > 0) {
          const [rowCoord, colCoord] = coordinateQueue.shift();

          for (let directionPair of movementDirections) {
            const [rowDelta, colDelta] = directionPair;
            const nextRowPos = rowCoord + rowDelta;
            const nextColPos = colCoord + colDelta;

            if (
              nextRowPos >= 0 &&
              nextRowPos < totalRows &&
              nextColPos >= 0 &&
              nextColPos < totalCols &&
              grid[nextRowPos][nextColPos] === "1"
            ) {
              grid[nextRowPos][nextColPos] = "0";
              coordinateQueue.push([nextRowPos, nextColPos]);
            }
          }
        }
      }
    }
  }

  return numberOfIslandsFound;
};

/**
 * Twisted Mirror Path Count
 * Intuition: Moving into a mirror reflects (right becomes down, down becomes right) and may bounce through more mirrors. Precompute the eventual empty cell (or out of bounds) entered from each mirror, then DP unique paths.
 * Approach: 1. From the bottom-right, for each cell store land[row][col][dir]: if the cell is empty, stay; if it is a mirror, follow the reflected neighbor’s landing for the new direction. 2. dp[0][0] = 1. 3. From each cell add dp into the landing of a right step and a down step, skipping out-of-bounds. 4. Return dp[m-1][n-1] mod 10^9+7.
 * Dry Run: grid = [[0, 0], [0, 0]]. From (0,0) right lands on (0,1), down on (1,0); both then reach (1,1). Answer 2.
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var uniquePaths = function (grid) {
  const MOD = 1e9 + 7;
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  const land = Array.from({ length: rowCount }, () =>
    Array.from({ length: columnCount }, () => [
      [0, 0],
      [0, 0],
    ])
  );

  for (let row = rowCount - 1; row >= 0; row--) {
    for (let column = columnCount - 1; column >= 0; column--) {
      if (grid[row][column] === 0) {
        land[row][column][0] = [row, column];
        land[row][column][1] = [row, column];
      } else {
        land[row][column][1] =
          column + 1 < columnCount
            ? land[row][column + 1][0]
            : [row, column + 1];
        land[row][column][0] =
          row + 1 < rowCount ? land[row + 1][column][1] : [row + 1, column];
      }
    }
  }

  const pathCount = Array.from({ length: rowCount }, () =>
    new Array(columnCount).fill(0)
  );
  pathCount[0][0] = 1;
  const rowStep = [1, 0];
  const columnStep = [0, 1];

  for (let row = 0; row < rowCount; row++) {
    for (let column = 0; column < columnCount; column++) {
      if (pathCount[row][column] === 0) {
        continue;
      }
      for (let direction = 0; direction < 2; direction++) {
        const nextRow = row + rowStep[direction];
        const nextColumn = column + columnStep[direction];
        if (
          nextRow < 0 ||
          nextRow >= rowCount ||
          nextColumn < 0 ||
          nextColumn >= columnCount
        ) {
          continue;
        }
        const [landRow, landColumn] = land[nextRow][nextColumn][1 - direction];
        if (
          landRow >= 0 &&
          landRow < rowCount &&
          landColumn >= 0 &&
          landColumn < columnCount
        ) {
          pathCount[landRow][landColumn] =
            (pathCount[landRow][landColumn] + pathCount[row][column]) % MOD;
        }
      }
    }
  }

  return pathCount[rowCount - 1][columnCount - 1];
};

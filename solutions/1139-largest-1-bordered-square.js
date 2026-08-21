/**
 * Largest 1 Bordered Square
 * Intuition: A 1-bordered square is determined by its bottom-right cell and side length. Consecutive 1s running left and up from each cell let us check the other two sides in O(1).
 * Approach: 1. dpH[r][c] / dpV[r][c] = consecutive 1s ending at (r,c) left/up. 2. For each 1, try side from min(dpH,dpV) down while larger than the best. 3. Side k works if top row has >=k horizontal 1s at the right column and left column has >=k vertical 1s at the bottom row. 4. Return side^2.
 * Dry Run: grid = [[1,1,1],[1,0,1],[1,1,1]].
 *   - At (2,2) dpH=3, dpV=3. Top-right (0,2) has horizontal 3, bottom-left (2,0) has vertical 3. Side 3.
 *   - Answer 9.
 * Time Complexity: O(rows * cols * min(rows, cols))
 * Space Complexity: O(rows * cols)
 */
var largest1BorderedSquare = function (grid) {
  const gridRows = grid.length;
  const gridCols = grid[0].length;

  const dpHorizontal = Array(gridRows)
    .fill(0)
    .map(() => Array(gridCols).fill(0));
  const dpVertical = Array(gridRows)
    .fill(0)
    .map(() => Array(gridCols).fill(0));

  let maximumSquareSide = 0;

  for (let rowIndex = 0; rowIndex < gridRows; rowIndex++) {
    for (let colIndex = 0; colIndex < gridCols; colIndex++) {
      if (grid[rowIndex][colIndex] === 1) {
        dpHorizontal[rowIndex][colIndex] =
          (colIndex > 0 ? dpHorizontal[rowIndex][colIndex - 1] : 0) + 1;
        dpVertical[rowIndex][colIndex] =
          (rowIndex > 0 ? dpVertical[rowIndex - 1][colIndex] : 0) + 1;

        let currentSideLength = Math.min(
          dpHorizontal[rowIndex][colIndex],
          dpVertical[rowIndex][colIndex]
        );

        while (currentSideLength > maximumSquareSide) {
          const potentialTopRow = rowIndex - currentSideLength + 1;
          const potentialLeftColumn = colIndex - currentSideLength + 1;

          if (
            dpHorizontal[potentialTopRow][colIndex] >= currentSideLength &&
            dpVertical[rowIndex][potentialLeftColumn] >= currentSideLength
          ) {
            maximumSquareSide = currentSideLength;
            break;
          }
          currentSideLength--;
        }
      }
    }
  }

  return maximumSquareSide * maximumSquareSide;
};

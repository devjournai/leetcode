/**
 * Longest Line Of Consecutive One In Matrix
 * Intuition: DP per cell stores four run lengths of 1s ending there: horizontal, vertical, main diagonal, anti-diagonal. Extend from the previous cell in that direction when the current cell is 1.
 * Approach: 1. Empty matrix → 0. 2. `dpTable[r][c] = [h,v,diag,anti]`. 3. On a 1, h = left h+1 (or 1); v = above v+1; diag = up-left+1; anti = up-right+1. 4. Track max of those four. 5. Zeros stay [0,0,0,0]. Return `currentMaxLen`.
 * Dry Run: mat = [[0,1,1,0],[0,1,1,0],[0,0,0,1]].
 *   - (0,1) and (0,2) make horizontal 2; (1,2) main-diagonal from (0,1) is 2.
 *   - (2,3) extends that diagonal to 3. Return 3.
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var longestLine = function (mat) {
  const numRows = mat.length;
  if (numRows === 0) {
    return 0;
  }
  const numCols = mat[0].length;
  if (numCols === 0) {
    return 0;
  }

  const dpTable = Array.from({ length: numRows }, () =>
    Array.from({ length: numCols }, () => [0, 0, 0, 0])
  );

  let currentMaxLen = 0;

  for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
    for (let colIndex = 0; colIndex < numCols; colIndex++) {
      if (mat[rowIndex][colIndex] === 1) {
        let lengthHorizontal = 1;
        if (colIndex > 0) {
          lengthHorizontal = dpTable[rowIndex][colIndex - 1][0] + 1;
        }
        dpTable[rowIndex][colIndex][0] = lengthHorizontal;

        let lengthVertical = 1;
        if (rowIndex > 0) {
          lengthVertical = dpTable[rowIndex - 1][colIndex][1] + 1;
        }
        dpTable[rowIndex][colIndex][1] = lengthVertical;

        let lengthMainDiagonal = 1;
        if (rowIndex > 0 && colIndex > 0) {
          lengthMainDiagonal = dpTable[rowIndex - 1][colIndex - 1][2] + 1;
        }
        dpTable[rowIndex][colIndex][2] = lengthMainDiagonal;

        let lengthAntiDiagonal = 1;
        if (rowIndex > 0 && colIndex < numCols - 1) {
          lengthAntiDiagonal = dpTable[rowIndex - 1][colIndex + 1][3] + 1;
        }
        dpTable[rowIndex][colIndex][3] = lengthAntiDiagonal;

        currentMaxLen = Math.max(
          currentMaxLen,
          lengthHorizontal,
          lengthVertical,
          lengthMainDiagonal,
          lengthAntiDiagonal
        );
      }
    }
  }

  return currentMaxLen;
};

/**
 * Diagonal Traverse
 * Intuition: Walk every cell once, zigzagging: up-right until the top or right border, then down-left until the bottom or left border.
 * Approach: 1. Empty matrix → []. 2. Start (0,0) moving up-right. 3. For each of m*n cells, write `mat[r][c]`. If going up-right: at last column step down and flip; else at row 0 step right and flip; else r--, c++. If going down-left: at last row step right and flip; else at col 0 step down and flip; else r++, c--.
 * Dry Run: mat = [[1,2,3],[4,5,6],[7,8,9]].
 *   - 1 → right to 2 → down-left 4 → down 7 → up-right 5 → 3 → down 6 → 8 → 9. Result [1,2,4,7,5,3,6,8,9].
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var findDiagonalOrder = function (mat) {
  if (!mat || mat.length === 0 || mat[0].length === 0) {
    return [];
  }

  const numRows = mat.length;
  const numCols = mat[0].length;
  const totalElements = numRows * numCols;
  const traversalResult = new Array(totalElements);

  let currentRow = 0;
  let currentCol = 0;
  let isMovingUpRight = true;

  for (
    let elementCounter = 0;
    elementCounter < totalElements;
    elementCounter++
  ) {
    traversalResult[elementCounter] = mat[currentRow][currentCol];

    if (isMovingUpRight) {
      if (currentCol === numCols - 1) {
        currentRow++;
        isMovingUpRight = false;
      } else if (currentRow === 0) {
        currentCol++;
        isMovingUpRight = false;
      } else {
        currentRow--;
        currentCol++;
      }
    } else {
      if (currentRow === numRows - 1) {
        currentCol++;
        isMovingUpRight = true;
      } else if (currentCol === 0) {
        currentRow++;
        isMovingUpRight = true;
      } else {
        currentRow++;
        currentCol--;
      }
    }
  }

  return traversalResult;
};

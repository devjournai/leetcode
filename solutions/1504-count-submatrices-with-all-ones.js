/**
 * Count Submatrices With All Ones
 * Intuition: Each row is a histogram of consecutive 1s upward. A monotonic stack counts all-1 submatrices that end at the current cell.
 * Approach: 1. height[col] grows on 1 else resets. 2. Pop taller/equal bars. 3. Count rectangles ending here as prev.sum + height*(col-prev.index), or height*(col+1) if empty. 4. Accumulate.
 * Dry Run: grid = [[1,0,1],[1,1,0],[1,1,0]].
 *   - Row 0 heights [1,0,1] add 2; later rows add the remaining all-1 rectangles → 13.
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(cols)
 */
var numSubmat = function (gridInput) {
  const rowsTotal = gridInput.length;
  const colsTotal = gridInput[0].length;

  const heightTracker = new Array(colsTotal).fill(0);
  let totalMatrixCount = 0;

  for (let rowIter = 0; rowIter < rowsTotal; rowIter++) {
    const colIndexStack = [];

    for (let colIter = 0; colIter < colsTotal; colIter++) {
      heightTracker[colIter] =
        gridInput[rowIter][colIter] === 1 ? heightTracker[colIter] + 1 : 0;

      const currentHeightValue = heightTracker[colIter];

      while (
        colIndexStack.length > 0 &&
        currentHeightValue <=
          heightTracker[colIndexStack[colIndexStack.length - 1].index]
      ) {
        colIndexStack.pop();
      }

      let currentColumnSum = 0;
      if (colIndexStack.length > 0) {
        const previousStackEntry = colIndexStack[colIndexStack.length - 1];
        currentColumnSum =
          previousStackEntry.sum +
          currentHeightValue * (colIter - previousStackEntry.index);
      } else {
        currentColumnSum = currentHeightValue * (colIter + 1);
      }

      colIndexStack.push({ index: colIter, sum: currentColumnSum });
      totalMatrixCount += currentColumnSum;
    }
  }

  return totalMatrixCount;
};

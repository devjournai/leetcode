/**
 * Maximum Non Negative Product in a Matrix
 * Intuition: Negatives flip min/max; store both min and max product reaching each cell from left/up.
 * Approach: 1. dp[r][c]=[min,max]. 2. Fill first row/col. 3. Each cell from up and left products. 4. If final max<0 return -1 else max%1e9+7.
 * Dry Run: grid = [[-1,2,3],[4,-5,6],[7,8,9]].
 *   - Best path product 1080 ≥ 0 → 1080.
 * Time Complexity: O(rows * cols)
 * Space Complexity: O(rows * cols)
 */
var maxProductPath = function (grid) {
  const gridRowsCount = grid.length;
  const gridColumnCount = grid[0].length;
  const productTrackingTable = Array.from({ length: gridRowsCount }, () =>
    Array.from({ length: gridColumnCount }, () => [0, 0])
  );

  productTrackingTable[0][0] = [grid[0][0], grid[0][0]];

  for (
    let columnIteratorForFirstRow = 1;
    columnIteratorForFirstRow < gridColumnCount;
    columnIteratorForFirstRow++
  ) {
    const currentGridItem = grid[0][columnIteratorForFirstRow];
    const previousMaxFromLeft =
      productTrackingTable[0][columnIteratorForFirstRow - 1][1];
    const previousMinFromLeft =
      productTrackingTable[0][columnIteratorForFirstRow - 1][0];

    productTrackingTable[0][columnIteratorForFirstRow][0] = Math.min(
      previousMaxFromLeft * currentGridItem,
      previousMinFromLeft * currentGridItem
    );
    productTrackingTable[0][columnIteratorForFirstRow][1] = Math.max(
      previousMaxFromLeft * currentGridItem,
      previousMinFromLeft * currentGridItem
    );
  }

  for (
    let rowIteratorForFirstColumn = 1;
    rowIteratorForFirstColumn < gridRowsCount;
    rowIteratorForFirstColumn++
  ) {
    const currentGridItemInColumn = grid[rowIteratorForFirstColumn][0];
    const previousMaxFromTop =
      productTrackingTable[rowIteratorForFirstColumn - 1][0][1];
    const previousMinFromTop =
      productTrackingTable[rowIteratorForFirstColumn - 1][0][0];

    productTrackingTable[rowIteratorForFirstColumn][0][0] = Math.min(
      previousMaxFromTop * currentGridItemInColumn,
      previousMinFromTop * currentGridItemInColumn
    );
    productTrackingTable[rowIteratorForFirstColumn][0][1] = Math.max(
      previousMaxFromTop * currentGridItemInColumn,
      previousMinFromTop * currentGridItemInColumn
    );
  }

  for (
    let matrixRowIndex = 1;
    matrixRowIndex < gridRowsCount;
    matrixRowIndex++
  ) {
    for (
      let matrixColumnIndex = 1;
      matrixColumnIndex < gridColumnCount;
      matrixColumnIndex++
    ) {
      const currentMatrixValue = grid[matrixRowIndex][matrixColumnIndex];

      let currentMinimumPossibleProduct = Infinity;
      let currentMaximumPossibleProduct = -Infinity;

      const minProductFromAbove =
        productTrackingTable[matrixRowIndex - 1][matrixColumnIndex][0];
      const maxProductFromAbove =
        productTrackingTable[matrixRowIndex - 1][matrixColumnIndex][1];

      currentMinimumPossibleProduct = Math.min(
        currentMinimumPossibleProduct,
        minProductFromAbove * currentMatrixValue,
        maxProductFromAbove * currentMatrixValue
      );
      currentMaximumPossibleProduct = Math.max(
        currentMaximumPossibleProduct,
        minProductFromAbove * currentMatrixValue,
        maxProductFromAbove * currentMatrixValue
      );

      const minProductFromLeft =
        productTrackingTable[matrixRowIndex][matrixColumnIndex - 1][0];
      const maxProductFromLeft =
        productTrackingTable[matrixRowIndex][matrixColumnIndex - 1][1];

      currentMinimumPossibleProduct = Math.min(
        currentMinimumPossibleProduct,
        minProductFromLeft * currentMatrixValue,
        maxProductFromLeft * currentMatrixValue
      );
      currentMaximumPossibleProduct = Math.max(
        currentMaximumPossibleProduct,
        minProductFromLeft * currentMatrixValue,
        maxProductFromLeft * currentMatrixValue
      );

      productTrackingTable[matrixRowIndex][matrixColumnIndex] = [
        currentMinimumPossibleProduct,
        currentMaximumPossibleProduct,
      ];
    }
  }

  const ultimateMaxProductResult =
    productTrackingTable[gridRowsCount - 1][gridColumnCount - 1][1];
  const moduloValueForCalculation = 1000000000 + 7;

  return ultimateMaxProductResult < 0
    ? -1
    : ultimateMaxProductResult % moduloValueForCalculation;
};

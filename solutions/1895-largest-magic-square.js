/**
 * Largest Magic Square
 * Intuition: A k×k magic square has equal row, column, and both diagonal sums. Search k from large to small; prefix sums check rows/cols quickly.
 * Approach: 1. Build `rowPrefixSums` and `colPrefixSums`. 2. For squareSideLength down to 2, for each bottom-right, compare all rows, cols, main and anti diagonals to the first row sum. 3. Return first success or 1.
 * Dry Run: grid=[[8,1,6],[3,5,7],[4,9,2]] is a 3×3 magic square. Return 3.
 * Time Complexity: O(R * C * min(R, C)^2)
 * Space Complexity: O(R * C)
 */
var largestMagicSquare = function (grid) {
  const totalRows = grid.length;
  const totalCols = grid[0].length;

  const rowPrefixSums = Array.from({ length: totalRows + 1 }, () =>
    new Array(totalCols + 1).fill(0)
  );
  const colPrefixSums = Array.from({ length: totalRows + 1 }, () =>
    new Array(totalCols + 1).fill(0)
  );

  for (let currentGridRow = 1; currentGridRow <= totalRows; currentGridRow++) {
    for (
      let currentGridCol = 1;
      currentGridCol <= totalCols;
      currentGridCol++
    ) {
      rowPrefixSums[currentGridRow][currentGridCol] =
        rowPrefixSums[currentGridRow][currentGridCol - 1] +
        grid[currentGridRow - 1][currentGridCol - 1];
      colPrefixSums[currentGridRow][currentGridCol] =
        colPrefixSums[currentGridRow - 1][currentGridCol] +
        grid[currentGridRow - 1][currentGridCol - 1];
    }
  }

  const defaultMinSize = 1;
  for (
    let squareSideLength = Math.min(totalRows, totalCols);
    squareSideLength >= 2;
    squareSideLength--
  ) {
    for (
      let bottomRightGridRow = squareSideLength;
      bottomRightGridRow <= totalRows;
      bottomRightGridRow++
    ) {
      for (
        let bottomRightGridCol = squareSideLength;
        bottomRightGridCol <= totalCols;
        bottomRightGridCol++
      ) {
        let isCurrentSquareMagic = true;

        const targetMagicSum =
          rowPrefixSums[bottomRightGridRow - squareSideLength + 1][
            bottomRightGridCol
          ] -
          rowPrefixSums[bottomRightGridRow - squareSideLength + 1][
            bottomRightGridCol - squareSideLength
          ];

        for (
          let checkRowOffset = 0;
          checkRowOffset < squareSideLength;
          checkRowOffset++
        ) {
          const currentRowIndex =
            bottomRightGridRow - squareSideLength + 1 + checkRowOffset;
          const currentRowSum =
            rowPrefixSums[currentRowIndex][bottomRightGridCol] -
            rowPrefixSums[currentRowIndex][
              bottomRightGridCol - squareSideLength
            ];
          if (currentRowSum !== targetMagicSum) {
            isCurrentSquareMagic = false;
            break;
          }
        }

        if (!isCurrentSquareMagic) continue;

        for (
          let checkColOffset = 0;
          checkColOffset < squareSideLength;
          checkColOffset++
        ) {
          const currentColIndex =
            bottomRightGridCol - squareSideLength + 1 + checkColOffset;
          const currentColSum =
            colPrefixSums[bottomRightGridRow][currentColIndex] -
            colPrefixSums[bottomRightGridRow - squareSideLength][
              currentColIndex
            ];
          if (currentColSum !== targetMagicSum) {
            isCurrentSquareMagic = false;
            break;
          }
        }

        if (!isCurrentSquareMagic) continue;

        let mainDiagonalAccumulator = 0;
        for (
          let diagElemIndex = 0;
          diagElemIndex < squareSideLength;
          diagElemIndex++
        ) {
          mainDiagonalAccumulator +=
            grid[bottomRightGridRow - squareSideLength + diagElemIndex][
              bottomRightGridCol - squareSideLength + diagElemIndex
            ];
        }
        if (mainDiagonalAccumulator !== targetMagicSum) {
          isCurrentSquareMagic = false;
        }

        if (!isCurrentSquareMagic) continue;

        let antiDiagonalAccumulator = 0;
        for (
          let antiDiagElemIndex = 0;
          antiDiagElemIndex < squareSideLength;
          antiDiagElemIndex++
        ) {
          antiDiagonalAccumulator +=
            grid[bottomRightGridRow - squareSideLength + antiDiagElemIndex][
              bottomRightGridCol - 1 - antiDiagElemIndex
            ];
        }
        if (antiDiagonalAccumulator !== targetMagicSum) {
          isCurrentSquareMagic = false;
        }

        if (isCurrentSquareMagic) {
          return squareSideLength;
        }
      }
    }
  }

  return defaultMinSize;
};

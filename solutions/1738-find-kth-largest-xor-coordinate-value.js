/**
 * Find Kth Largest Xor Coordinate Value
 * Time Complexity: O(R * C * log(R * C))
 * Space Complexity: O(R * C)
 */
var kthLargestValue = function (matrix, k) {
  const matrixRows = matrix.length;
  const matrixCols = matrix[0].length;

  const allXorCoordinates = [];
  const prefixXorGrid = Array.from({ length: matrixRows + 1 }, () =>
    Array(matrixCols + 1).fill(0),
  );

  for (let rowIterator = 1; rowIterator <= matrixRows; rowIterator++) {
    for (let colIterator = 1; colIterator <= matrixCols; colIterator++) {
      const xorFromPreviousRow = prefixXorGrid[rowIterator - 1][colIterator];
      const xorFromPreviousCol = prefixXorGrid[rowIterator][colIterator - 1];
      const xorFromDiag = prefixXorGrid[rowIterator - 1][colIterator - 1];
      const currentMatrixValue = matrix[rowIterator - 1][colIterator - 1];

      const calculatedCoordinateXor =
        xorFromPreviousRow ^
        xorFromPreviousCol ^
        xorFromDiag ^
        currentMatrixValue;
      prefixXorGrid[rowIterator][colIterator] = calculatedCoordinateXor;
      allXorCoordinates.push(calculatedCoordinateXor);
    }
  }

  allXorCoordinates.sort((valueA, valueB) => valueB - valueA);

  return allXorCoordinates[k - 1];
};

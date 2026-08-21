/**
 * Find Kth Largest Xor Coordinate Value
 * Intuition: Coordinate (i,j) XOR is the 2D prefix XOR of the submatrix (0,0)..(i,j). Compute all prefix XORs, sort descending, pick the k-th.
 * Approach: 1. `prefixXorGrid[r][c] = above ⊕ left ⊕ diag ⊕ matrix[r-1][c-1]`. 2. Push each value into `allXorCoordinates`. 3. Sort descending; return index k-1.
 * Dry Run: matrix = [[5,2],[1,6]], k = 1
 * prefixes 5, 5⊕2=7, 5⊕1=4, 5⊕2⊕1⊕6=0. Sorted 7,5,4,0 → k=1 → 7.
 * Time Complexity: O(R * C * log(R * C))
 * Space Complexity: O(R * C)
 */
var kthLargestValue = function (matrix, k) {
  const matrixRows = matrix.length;
  const matrixCols = matrix[0].length;

  const allXorCoordinates = [];
  const prefixXorGrid = Array.from({ length: matrixRows + 1 }, () =>
    Array(matrixCols + 1).fill(0)
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

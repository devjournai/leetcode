/**
 * Matrix Similarity After Cyclic Shifts
 * Time Complexity: O(m * n)
 * Space Complexity: O(1)
 */
var areSimilar = function (mat, k) {
  const rowDimension = mat.length;
  const columnDimension = mat[0].length;
  const effectiveShiftValue = k % columnDimension;

  for (let currentRow = 0; currentRow < rowDimension; currentRow++) {
    for (
      let currentColumn = 0;
      currentColumn < columnDimension;
      currentColumn++
    ) {
      let comparisonColumn;
      if (currentRow % 2 === 0) {
        comparisonColumn =
          (currentColumn + effectiveShiftValue) % columnDimension;
      } else {
        comparisonColumn =
          (currentColumn - effectiveShiftValue + columnDimension) %
          columnDimension;
      }

      if (
        mat[currentRow][currentColumn] !== mat[currentRow][comparisonColumn]
      ) {
        return false;
      }
    }
  }

  return true;
};

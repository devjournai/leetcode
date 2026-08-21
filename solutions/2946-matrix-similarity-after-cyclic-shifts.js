/**
 * Matrix Similarity After Cyclic Shifts
 *
 * Intuition:
 *
 * Every row of the matrix is cyclically shifted by k positions.
 *
 * The direction of the shift depends on the row:
 *
 *     Even row:
 *         shifted to the right by k positions.
 *
 *     Odd row:
 *         shifted to the left by k positions.
 *
 * After performing the shift, the matrix must remain exactly
 * the same as the original matrix.
 *
 * ------------------------------------------------------------
 *
 * Approach: Let `effectiveShiftValue = k % columnDimension`. For even rows compare `mat[r][c]` with `mat[r][(c+shift)%cols]`; for odd rows with `mat[r][(c-shift+cols)%cols]`. Return false on any mismatch.
 *
 * Instead of actually shifting the matrix, we can calculate
 * where every element would move.
 *
 * For an even row:
 *
 *     new position = (column + k) % numberOfColumns
 *
 * For an odd row:
 *
 *     new position = (column - k + numberOfColumns)
 *                    % numberOfColumns
 *
 * We compare:
 *
 *     mat[row][column]
 *
 * with:
 *
 *     mat[row][shiftedColumn]
 *
 * If even one pair is different, the matrix is not similar.
 *
 * ------------------------------------------------------------
 *
 * Why use:
 *
 *     k % columnDimension
 *
 * ?
 *
 * Because shifting by the number of columns brings the row back
 * to its original position.
 *
 * For example, with 5 columns:
 *
 *     shift by 5 = shift by 0
 *     shift by 10 = shift by 0
 *     shift by 7 = shift by 2
 *
 * So we only need:
 *
 *     k % columnDimension
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * mat = [
 *   [1,2,3],
 *   [4,5,6]
 * ]
 *
 * k = 1
 *
 * Row 0 is even:
 *
 *     1 -> compare with position (0 + 1) % 3 = 1
 *     2 -> compare with position (1 + 1) % 3 = 2
 *     3 -> compare with position (2 + 1) % 3 = 0
 *
 * Row 1 is odd:
 *
 *     4 -> compare with position (0 - 1 + 3) % 3 = 2
 *     5 -> compare with position (1 - 1 + 3) % 3 = 0
 *     6 -> compare with position (2 - 1 + 3) % 3 = 1
 *
 * If every comparison matches, the matrix is similar.
 *
 * ------------------------------------------------------------
 *
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

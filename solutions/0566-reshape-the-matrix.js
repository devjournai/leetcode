/**
 * Reshape The Matrix
 * Intuition: Row-major flatten then refill into `r` rows of `c` columns works iff the element count is unchanged; otherwise return the original matrix.
 * Approach: 1. If `rows*cols !== r*c`, return `mat`. 2. Allocate `r` empty rows. 3. Walk the source in row-major order, `push` into `floor(flatIndex / c)`. 4. Return the new matrix.
 * Dry Run: mat = [[1,2],[3,4]], r=1, c=4.
 *   - Count matches; flatten index 0..3 fills one row [1,2,3,4].
 * Time Complexity: O(initialRowsLength * initialColsLength)
 * Space Complexity: O(newRowsCount * newColsCount)
 */
var matrixReshape = function (mat, r, c) {
  const initialRowsLength = mat.length;
  const initialColsLength = mat[0].length;

  if (initialRowsLength * initialColsLength !== r * c) {
    return mat;
  }

  const outputMatrixForm = Array(r)
    .fill(null)
    .map(() => []);
  let currentFlattenedIndex = 0;

  for (
    let currentRowIterator = 0;
    currentRowIterator < initialRowsLength;
    currentRowIterator++
  ) {
    for (
      let currentColIterator = 0;
      currentColIterator < initialColsLength;
      currentColIterator++
    ) {
      const elementValue = mat[currentRowIterator][currentColIterator];
      const targetRowPosition = Math.floor(currentFlattenedIndex / c);
      outputMatrixForm[targetRowPosition].push(elementValue);
      currentFlattenedIndex++;
    }
  }

  return outputMatrixForm;
};

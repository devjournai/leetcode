/**
 * Reshape The Matrix
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

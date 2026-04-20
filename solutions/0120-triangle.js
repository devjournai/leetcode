/**
 * Triangle
 * Time Complexity: O(R^2)
 * Space Complexity: O(R)
 */
var minimumTotal = function (triangle) {
  if (triangle.length === 1) {
    return triangle[0][0];
  }

  let minPathSumsToPreviousRow = [triangle[0][0]];

  for (
    let currentRowIndex = 1;
    currentRowIndex < triangle.length;
    currentRowIndex++
  ) {
    let currentTriangleRowValues = triangle[currentRowIndex];
    let minPathSumsToCurrentRow = new Array(currentTriangleRowValues.length);

    minPathSumsToCurrentRow[0] =
      minPathSumsToPreviousRow[0] + currentTriangleRowValues[0];

    for (
      let positionInCurrentRow = 1;
      positionInCurrentRow < currentRowIndex;
      positionInCurrentRow++
    ) {
      minPathSumsToCurrentRow[positionInCurrentRow] =
        currentTriangleRowValues[positionInCurrentRow] +
        Math.min(
          minPathSumsToPreviousRow[positionInCurrentRow - 1],
          minPathSumsToPreviousRow[positionInCurrentRow],
        );
    }

    minPathSumsToCurrentRow[currentRowIndex] =
      minPathSumsToPreviousRow[currentRowIndex - 1] +
      currentTriangleRowValues[currentRowIndex];

    minPathSumsToPreviousRow = minPathSumsToCurrentRow;
  }

  let minimumFinalSum = Infinity;
  for (
    let pathIndex = 0;
    pathIndex < minPathSumsToPreviousRow.length;
    pathIndex++
  ) {
    if (minPathSumsToPreviousRow[pathIndex] < minimumFinalSum) {
      minimumFinalSum = minPathSumsToPreviousRow[pathIndex];
    }
  }

  return minimumFinalSum;
};

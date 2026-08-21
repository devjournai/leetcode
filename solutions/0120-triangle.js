/**
 * Triangle
 * Intuition: The min path to a cell is that cell plus the cheaper of the two parents above it. Only the previous row’s min-path array is needed.
 * Approach: 1. Single-row triangle returns that value. 2. Seed previous with row 0. 3. For each later row, ends take only the adjacent previous end; interiors take min of previous[j-1] and previous[j]. 4. Scan the last row for the minimum.
 * Dry Run: [[2],[3,4],[6,5,7],[4,1,8,3]]. After last row mins are [11,8,12,10] (paths ending at 4,1,8,3). Answer 8 via 2-3-5-1.
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
          minPathSumsToPreviousRow[positionInCurrentRow]
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

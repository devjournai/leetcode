/**
 * Largest Submatrix With Rearrangements
 * Time Complexity: O(rows * cols * log(cols))
 * Space Complexity: O(cols)
 */
var largestSubmatrix = function (matrix) {
  const totalRows = matrix.length;
  const totalColumns = matrix[0].length;
  let maximumAchievedArea = 0;

  for (
    let currentRowIndex = 0;
    currentRowIndex < totalRows;
    currentRowIndex++
  ) {
    for (
      let currentColumnIndex = 0;
      currentColumnIndex < totalColumns;
      currentColumnIndex++
    ) {
      if (
        currentRowIndex > 0 &&
        matrix[currentRowIndex][currentColumnIndex] === 1
      ) {
        matrix[currentRowIndex][currentColumnIndex] +=
          matrix[currentRowIndex - 1][currentColumnIndex];
      }
    }

    const currentColumnHeights = matrix[currentRowIndex].slice();
    currentColumnHeights.sort((heightA, heightB) => heightB - heightA);

    for (
      let sortedHeightIndex = 0;
      sortedHeightIndex < totalColumns;
      sortedHeightIndex++
    ) {
      const heightValue = currentColumnHeights[sortedHeightIndex];
      if (heightValue === 0) {
        break;
      }
      const currentSubmatrixWidth = sortedHeightIndex + 1;
      const calculatedArea = heightValue * currentSubmatrixWidth;
      maximumAchievedArea = Math.max(maximumAchievedArea, calculatedArea);
    }
  }

  return maximumAchievedArea;
};

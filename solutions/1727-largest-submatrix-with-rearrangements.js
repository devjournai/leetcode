/**
 * Largest Submatrix With Rearrangements
 * Intuition: After freely reordering columns, any set of columns can be grouped. Consecutive 1-heights from the top of the current row, sorted descending, give histogram bars; area = height[i]*(i+1).
 * Approach: 1. Convert each cell to consecutive-1 height downward from previous rows. 2. Copy the row, sort heights descending. 3. For each prefix of columns, update `maximumAchievedArea`. 4. Return the max.
 * Dry Run: matrix = [[0,0,1],[1,1,1],[1,0,1]]
 * Row2 heights [2,1,3] sorted [3,2,1] → areas 3,4,3 → 4.
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

/**
 * Number Of Corner Rectangles
 * Time Complexity: O(R^2 * C)
 * Space Complexity: O(1)
 */
var countCornerRectangles = function (grid) {
  const gridRowsCount = grid.length;
  const gridColumnsCount = grid[0].length;
  let totalCornerRectangles = 0;

  for (let rowIndexOne = 0; rowIndexOne < gridRowsCount; rowIndexOne++) {
    for (
      let rowIndexTwo = rowIndexOne + 1;
      rowIndexTwo < gridRowsCount;
      rowIndexTwo++
    ) {
      let columnsWithSharedOnes = 0;
      for (
        let currentColumnIndex = 0;
        currentColumnIndex < gridColumnsCount;
        currentColumnIndex++
      ) {
        if (
          grid[rowIndexOne][currentColumnIndex] === 1 &&
          grid[rowIndexTwo][currentColumnIndex] === 1
        ) {
          columnsWithSharedOnes++;
        }
      }
      totalCornerRectangles +=
        (columnsWithSharedOnes * (columnsWithSharedOnes - 1)) / 2;
    }
  }

  return totalCornerRectangles;
};

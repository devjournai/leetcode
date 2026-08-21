/**
 * Number Of Corner Rectangles
 * Intuition: A axis-aligned rectangle of 1s is determined by two rows and two columns where both rows have 1s. For each pair of rows, if they share `c` columns of 1s, they form `C(c,2)` rectangles.
 * Approach: 1. For each pair `rowIndexOne < rowIndexTwo`, count `columnsWithSharedOnes`. 2. Add `columnsWithSharedOnes * (columnsWithSharedOnes - 1) / 2` to `totalCornerRectangles`.
 * Dry Run: Two rows [1,0,1] and [1,0,1] share two columns → 1 rectangle. A third 1-column would add more pairs.
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

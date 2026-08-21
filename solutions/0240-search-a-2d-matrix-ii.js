/**
 * Search A 2d Matrix II
 * Intuition: Rows and columns are sorted, so the top-right cell is a pivot: anything smaller must be left of it, anything larger must be below it. Each comparison discards a row or a column.
 * Approach: 1. Start at `rowIndex = 0`, `columnIndex = last column`. 2. While in bounds, compare `matrix[row][col]` to `target`. 3. Equal → true; smaller → `rowIndex++`; larger → `columnIndex--`. 4. If the walk exits the matrix, return false.
 * Dry Run: matrix = [[1,4,7],[2,5,8]], target = 5.
 *   - Start at 7: 7>5 → move left to 4. 4<5 → move down to 5. Equal → true.
 * Time Complexity: O(rows + columns)
 * Space Complexity: O(1)
 */
var searchMatrix = function (matrix, target) {
  const totalRows = matrix.length;
  const totalColumns = matrix[0].length;

  let rowIndex = 0;
  let columnIndex = totalColumns - 1;

  while (rowIndex < totalRows && columnIndex >= 0) {
    const currentComparisonValue = matrix[rowIndex][columnIndex];

    if (currentComparisonValue === target) {
      return true;
    } else if (currentComparisonValue < target) {
      rowIndex++;
    } else {
      columnIndex--;
    }
  }

  return false;
};

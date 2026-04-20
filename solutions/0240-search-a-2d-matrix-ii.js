/**
 * Search A 2d Matrix II
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

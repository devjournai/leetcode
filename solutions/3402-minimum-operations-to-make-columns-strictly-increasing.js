/**
 * Minimum Operations to Make Columns Strictly Increasing
 * Intuition: Each column is independent. The only way to increase a cell is +1 per operation, so if grid[row][col] is not greater than the cell above, raise it to above + 1 and charge the gap.
 * Approach: 1. For every column, scan from row 1 downward. 2. If current <= previous, add (previous - current + 1) operations and set current = previous + 1. 3. Sum operations over all columns.
 * Dry Run: [[3,2],[1,3],[3,4],[3,5]]. Col 0: 1->4 (+3), 3->5 (+2), 3->6 (+3) total 8. Col 1 already 2<3<4<5. Answer 8.
 * Time Complexity: O(M * N)
 * Space Complexity: O(1)
 */

var minimumOperations = function (grid) {
  const rowCount = grid.length;
  const columnCount = grid[0].length;
  let operationCount = 0;

  for (let columnIndex = 0; columnIndex < columnCount; columnIndex++) {
    for (let rowIndex = 1; rowIndex < rowCount; rowIndex++) {
      const previousValue = grid[rowIndex - 1][columnIndex];
      if (grid[rowIndex][columnIndex] <= previousValue) {
        operationCount += previousValue - grid[rowIndex][columnIndex] + 1;
        grid[rowIndex][columnIndex] = previousValue + 1;
      }
    }
  }

  return operationCount;
};

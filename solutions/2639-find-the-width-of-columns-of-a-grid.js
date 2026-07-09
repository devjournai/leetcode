/**
 * Find The Width Of Columns Of A Grid
 * Intuition: The width of a column is determined by the integer with the maximum string length within that column. This implies iterating through each column and, for each cell in that column, calculating its string length to find the greatest among them.
 * Approach: 1. Determine the dimensions (rows and columns) of the input grid. 2. Initialize an array to store the maximum width for each column, pre-filled with zeros. 3. Iterate through each column using an outer loop. 4. For each column, iterate through all its rows using an inner loop. 5. In the inner loop, retrieve the current integer, convert it to a string, and find its length. 6. Update the corresponding column's maximum width in the results array by taking the maximum of its current value and the newly calculated string length. 7. Return the array containing the maximum widths for all columns.
 * Dry Run: grid = [[-10], [3], [12]]
 *   1. gridRowsCount = 3, gridColumnsCount = 1
 *   2. columnMaximumLengths = [0]
 *   3. columnIterator = 0 (first and only column)
 *      - rowIterator = 0: currentGridValue = grid[0][0] = -10. stringValueLength = String(-10).length = 3.
 *        columnMaximumLengths[0] = Math.max(columnMaximumLengths[0], 3) = Math.max(0, 3) = 3. columnMaximumLengths = [3]
 *      - rowIterator = 1: currentGridValue = grid[1][0] = 3. stringValueLength = String(3).length = 1.
 *        columnMaximumLengths[0] = Math.max(columnMaximumLengths[0], 1) = Math.max(3, 1) = 3. columnMaximumLengths = [3]
 *      - rowIterator = 2: currentGridValue = grid[2][0] = 12. stringValueLength = String(12).length = 2.
 *        columnMaximumLengths[0] = Math.max(columnMaximumLengths[0], 2) = Math.max(3, 2) = 3. columnMaximumLengths = [3]
 *   4. Loop finishes.
 *   5. Return columnMaximumLengths = [3].
 * Time Complexity: O(M * N)
 * Space Complexity: O(N)
 */
var findColumnWidth = function (grid) {
  const gridRowsCount = grid.length;
  const gridColumnsCount = grid[0].length;
  const columnMaximumLengths = new Array(gridColumnsCount).fill(0);

  for (
    let columnIterator = 0;
    columnIterator < gridColumnsCount;
    columnIterator++
  ) {
    for (let rowIterator = 0; rowIterator < gridRowsCount; rowIterator++) {
      const currentGridValue = grid[rowIterator][columnIterator];
      const stringValueLength = String(currentGridValue).length;
      columnMaximumLengths[columnIterator] = Math.max(
        columnMaximumLengths[columnIterator],
        stringValueLength,
      );
    }
  }

  return columnMaximumLengths;
};

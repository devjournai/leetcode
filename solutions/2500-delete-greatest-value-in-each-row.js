/**
 * Delete Greatest Value In Each Row
 * Intuition: Sorting each row allows us to consistently identify and "remove" the greatest element by iterating from the end of each sorted row.
 * Approach: 1. Sort each row of the input matrix in ascending order. 2. Initialize a sum variable. 3. Iterate from the last column index down to the first. 4. In each column iteration, find the maximum element among all rows at that specific column index. 5. Add this maximum to the sum. 6. Return the accumulated sum.
 * Dry Run:
 * grid = [[1,2,4],[3,3,1]]
 *
 * 1. Sort each row:
 *    grid becomes [[1,2,4],[1,3,3]]
 *
 * 2. Initialize totalAccumulatedSum = 0
 *
 * 3. Outer loop: Iterate columnTraversalIndex from (number of columns - 1) down to 0.
 *    Number of columns = 3. So columnTraversalIndex goes 2, 1, 0.
 *
 *    a. columnTraversalIndex = 2 (last column)
 *       currentMaxAcrossRows = 0
 *       Inner loop: Iterate currentRowPointer from 0 to (number of rows - 1).
 *       Number of rows = 2. So currentRowPointer goes 0, 1.
 *       - currentRowPointer = 0: grid[0][2] is 4. currentMaxAcrossRows = Math.max(0, 4) = 4.
 *       - currentRowPointer = 1: grid[1][2] is 3. currentMaxAcrossRows = Math.max(4, 3) = 4.
 *       After inner loop, currentMaxAcrossRows = 4.
 *       totalAccumulatedSum = 0 + 4 = 4.
 *
 *    b. columnTraversalIndex = 1 (second to last column)
 *       currentMaxAcrossRows = 0
 *       Inner loop:
 *       - currentRowPointer = 0: grid[0][1] is 2. currentMaxAcrossRows = Math.max(0, 2) = 2.
 *       - currentRowPointer = 1: grid[1][1] is 3. currentMaxAcrossRows = Math.max(2, 3) = 3.
 *       After inner loop, currentMaxAcrossRows = 3.
 *       totalAccumulatedSum = 4 + 3 = 7.
 *
 *    c. columnTraversalIndex = 0 (first column)
 *       currentMaxAcrossRows = 0
 *       Inner loop:
 *       - currentRowPointer = 0: grid[0][0] is 1. currentMaxAcrossRows = Math.max(0, 1) = 1.
 *       - currentRowPointer = 1: grid[1][0] is 1. currentMaxAcrossRows = Math.max(1, 1) = 1.
 *       After inner loop, currentMaxAcrossRows = 1.
 *       totalAccumulatedSum = 7 + 1 = 8.
 *
 * 4. Loop finishes.
 * 5. Return totalAccumulatedSum (which is 8).
 * Time Complexity: O(M * N log N)
 * Space Complexity: O(1)
 */
var deleteGreatestValue = function (grid) {
  const rowCount = grid.length;
  const colCount = grid[0].length;

  for (
    let currentGridRowIndex = 0;
    currentGridRowIndex < rowCount;
    currentGridRowIndex++
  ) {
    grid[currentGridRowIndex].sort((valueA, valueB) => valueA - valueB);
  }

  let totalAccumulatedSum = 0;

  for (
    let columnTraversalIndex = colCount - 1;
    columnTraversalIndex >= 0;
    columnTraversalIndex--
  ) {
    let currentMaxAcrossRows = 0;
    for (
      let currentRowPointer = 0;
      currentRowPointer < rowCount;
      currentRowPointer++
    ) {
      currentMaxAcrossRows = Math.max(
        currentMaxAcrossRows,
        grid[currentRowPointer][columnTraversalIndex],
      );
    }
    totalAccumulatedSum += currentMaxAcrossRows;
  }

  return totalAccumulatedSum;
};

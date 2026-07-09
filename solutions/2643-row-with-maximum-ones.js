/**
 * Row With Maximum Ones
 * Intuition: The problem requires finding the row with the most '1's, prioritizing the smaller row index if counts are equal. A direct scan of each row, counting '1's, and keeping track of the best result seen so far, is a straightforward and efficient approach.
 * Approach: 1. Initialize variables to store the best row index found (`maxRowResultIndex`) and the maximum count of ones (`maxOnesFound`) to zero. 2. Iterate through each row of the input matrix using a `while` loop, tracking the current row's index (`rowIndexIterator`). 3. For each row, iterate through its columns using a `for` loop to count the number of '1's present in that specific row (`currentOnesTally`). 4. After counting ones for a row, compare `currentOnesTally` with `maxOnesFound`. If `currentOnesTally` is strictly greater, update `maxOnesFound` and `maxRowResultIndex` with the current row's data. 5. Increment `rowIndexIterator` to move to the next row. 6. After iterating through all rows, return an array containing `maxRowResultIndex` and `maxOnesFound`.
 * Dry Run: mat = [[0,1],[1,0]]
 *   1. Initialize `maxRowResultIndex = 0`, `maxOnesFound = 0`.
 *   2. `rowIndexIterator = 0`.
 *   3. Outer `while` loop (current `rowIndexIterator = 0`):
 *      a. `currentOnesTally = 0`.
 *      b. Inner `for` loop for `mat[0]` (`[0,1]`):
 *         - `colIterator = 0`: `mat[0][0]` is 0. `currentOnesTally` remains 0.
 *         - `colIterator = 1`: `mat[0][1]` is 1. `currentOnesTally` becomes 1.
 *      c. Check `currentOnesTally` (1) > `maxOnesFound` (0). Condition is true.
 *         - `maxOnesFound` becomes 1.
 *         - `maxRowResultIndex` becomes 0.
 *      d. Increment `rowIndexIterator` to 1.
 *   4. Outer `while` loop (current `rowIndexIterator = 1`):
 *      a. `currentOnesTally = 0`.
 *      b. Inner `for` loop for `mat[1]` (`[1,0]`):
 *         - `colIterator = 0`: `mat[1][0]` is 1. `currentOnesTally` becomes 1.
 *         - `colIterator = 1`: `mat[1][1]` is 0. `currentOnesTally` remains 1.
 *      c. Check `currentOnesTally` (1) > `maxOnesFound` (1). Condition is false. (Not strictly greater).
 *      d. Increment `rowIndexIterator` to 2.
 *   5. Outer `while` loop (current `rowIndexIterator = 2`):
 *      a. `2 < mat.length` (2 < 2) is false. Loop terminates.
 *   6. Return `[maxRowResultIndex, maxOnesFound]`, which is `[0, 1]`.
 * Time Complexity: O(M * N)
 * Space Complexity: O(1)
 */
var rowAndMaximumOnes = function (mat) {
  let maxRowResultIndex = 0;
  let maxOnesFound = 0;

  let rowIndexIterator = 0;
  const numRows = mat.length;

  while (rowIndexIterator < numRows) {
    let currentOnesTally = 0;
    const currentRow = mat[rowIndexIterator];
    const numCols = currentRow.length;

    for (let colIterator = 0; colIterator < numCols; colIterator++) {
      if (currentRow[colIterator] === 1) {
        currentOnesTally++;
      }
    }

    if (currentOnesTally > maxOnesFound) {
      maxOnesFound = currentOnesTally;
      maxRowResultIndex = rowIndexIterator;
    }

    rowIndexIterator++;
  }

  return [maxRowResultIndex, maxOnesFound];
};

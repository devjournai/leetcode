/**
 * Snail Traversal
 * Intuition: The snail traversal pattern involves moving down a column, then up the next, alternating direction for each subsequent column. This can be modeled by iterating through columns and using the column index parity to determine the row traversal direction.
 * Approach: 1. Validate input dimensions: if the total cells (rowsCount * colsCount) do not match the input array's length, return an empty array. 2. Initialize a 2D result array with `rowsCount` empty arrays. 3. Maintain a single pointer `elementSourceIndex` for the current element in the original 1D array. 4. Iterate through columns from `0` to `colsCount - 1`. 5. For each column, check if its index is even or odd. If even, traverse rows from top to bottom (0 to `rowsCount - 1`), assigning `this[elementSourceIndex]` to `result[row][column]` and incrementing `elementSourceIndex`. If odd, traverse rows from bottom to top (`rowsCount - 1` to `0`), assigning `this[elementSourceIndex]` to `result[row][column]` and incrementing `elementSourceIndex`. 6. Return the constructed 2D array.
 * Dry Run:
 * Input: this = [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15], rowsCount = 5, colsCount = 4
 * 1. this.length = 20. rowsCount * colsCount = 5 * 4 = 20. Validation passes.
 * 2. finalGrid = [[], [], [], [], []]
 * 3. elementSourceIndex = 0
 * 4. currentColumnIndex = 0 (even):
 *    - currentRowIndex = 0: finalGrid[0][0] = 19, elementSourceIndex = 1
 *    - currentRowIndex = 1: finalGrid[1][0] = 10, elementSourceIndex = 2
 *    - currentRowIndex = 2: finalGrid[2][0] = 3, elementSourceIndex = 3
 *    - currentRowIndex = 3: finalGrid[3][0] = 7, elementSourceIndex = 4
 *    - currentRowIndex = 4: finalGrid[4][0] = 9, elementSourceIndex = 5
 *    finalGrid: [[19], [10], [3], [7], [9]] (conceptually, other columns still empty)
 * 5. currentColumnIndex = 1 (odd):
 *    - reverseRowIndex = 4: finalGrid[4][1] = 8, elementSourceIndex = 6
 *    - reverseRowIndex = 3: finalGrid[3][1] = 5, elementSourceIndex = 7
 *    - reverseRowIndex = 2: finalGrid[2][1] = 2, elementSourceIndex = 8
 *    - reverseRowIndex = 1: finalGrid[1][1] = 1, elementSourceIndex = 9
 *    - reverseRowIndex = 0: finalGrid[0][1] = 17, elementSourceIndex = 10
 *    finalGrid: [[19, 17], [10, 1], [3, 2], [7, 5], [9, 8]]
 * 6. currentColumnIndex = 2 (even):
 *    - currentRowIndex = 0: finalGrid[0][2] = 16, elementSourceIndex = 11
 *    - currentRowIndex = 1: finalGrid[1][2] = 14, elementSourceIndex = 12
 *    - currentRowIndex = 2: finalGrid[2][2] = 12, elementSourceIndex = 13
 *    - currentRowIndex = 3: finalGrid[3][2] = 18, elementSourceIndex = 14
 *    - currentRowIndex = 4: finalGrid[4][2] = 6, elementSourceIndex = 15
 *    finalGrid: [[19, 17, 16], [10, 1, 14], [3, 2, 12], [7, 5, 18], [9, 8, 6]]
 * 7. currentColumnIndex = 3 (odd):
 *    - reverseRowIndex = 4: finalGrid[4][3] = 13, elementSourceIndex = 16
 *    - reverseRowIndex = 3: finalGrid[3][3] = 11, elementSourceIndex = 17
 *    - reverseRowIndex = 2: finalGrid[2][3] = 20, elementSourceIndex = 18
 *    - reverseRowIndex = 1: finalGrid[1][3] = 4, elementSourceIndex = 19
 *    - reverseRowIndex = 0: finalGrid[0][3] = 15, elementSourceIndex = 20
 *    finalGrid: [[19, 17, 16, 15], [10, 1, 14, 4], [3, 2, 12, 20], [7, 5, 18, 11], [9, 8, 6, 13]]
 * 8. Loop finishes. Return finalGrid.
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
Array.prototype.snail = function (rowsCount, colsCount) {
  if (rowsCount * colsCount !== this.length) {
    return [];
  }

  const finalGrid = Array.from({ length: rowsCount }, () => []);
  let elementSourceIndex = 0;

  for (
    let currentColumnIndex = 0;
    currentColumnIndex < colsCount;
    currentColumnIndex++
  ) {
    if (currentColumnIndex % 2 === 0) {
      for (
        let currentRowIndex = 0;
        currentRowIndex < rowsCount;
        currentRowIndex++
      ) {
        finalGrid[currentRowIndex][currentColumnIndex] =
          this[elementSourceIndex];
        elementSourceIndex++;
      }
    } else {
      for (
        let reverseRowIndex = rowsCount - 1;
        reverseRowIndex >= 0;
        reverseRowIndex--
      ) {
        finalGrid[reverseRowIndex][currentColumnIndex] =
          this[elementSourceIndex];
        elementSourceIndex++;
      }
    }
  }

  return finalGrid;
};

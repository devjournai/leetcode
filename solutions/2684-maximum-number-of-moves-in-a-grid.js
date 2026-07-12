/**
 * Maximum Number Of Moves In A Grid
 * Intuition: The problem asks for the maximum number of moves, implying an optimization problem on a grid with dependent states. Since moves are restricted to strictly greater values and always to the next column, this suggests a directed acyclic graph (DAG) structure where cells are nodes and valid moves are directed edges. Dynamic programming with memoization is suitable to avoid recomputing the maximum moves possible from any given cell.
 * Approach: 1. Initialize a 2D array, `memoizationTable`, of the same dimensions as the input `grid`, filled with a sentinel value (e.g., -1) to indicate uncomputed states and store the maximum moves possible from each cell. 2. Define a recursive helper function `findMaxMovesFromCell(currentRowCoordinate, currentColumnCoordinate)`:
 *    a. Base case: If `currentColumnCoordinate` is the last column, no further moves are possible from this cell, so return 0.
 *    b. Memoization check: If `memoizationTable[currentRowCoordinate][currentColumnCoordinate]` has already been computed (not -1), return its stored value to prevent redundant calculations.
 *    c. Recursive step: Initialize a `maximumStepsForCurrentCell` variable to 0. Retrieve the `currentCellValue` from `grid[currentRowCoordinate][currentColumnCoordinate]`.
 *        i. Check the move to the diagonally up-right cell `(currentRowCoordinate - 1, currentColumnCoordinate + 1)`: If this target cell is within bounds and its value (`grid[currentRowCoordinate - 1][currentColumnCoordinate + 1]`) is strictly greater than `currentCellValue`, update `maximumStepsForCurrentCell` by taking the maximum of its current value and `1 + findMaxMovesFromCell(currentRowCoordinate - 1, currentColumnCoordinate + 1)`.
 *        ii. Check the move to the straight right cell `(currentRowCoordinate, currentColumnCoordinate + 1)`: If this target cell is within bounds and its value (`grid[currentRowCoordinate][currentColumnCoordinate + 1]`) is strictly greater than `currentCellValue`, update `maximumStepsForCurrentCell` by taking the maximum of its current value and `1 + findMaxMovesFromCell(currentRowCoordinate, currentColumnCoordinate + 1)`.
 *        iii. Check the move to the diagonally down-right cell `(currentRowCoordinate + 1, currentColumnCoordinate + 1)`: If this target cell is within bounds and its value (`grid[currentRowCoordinate + 1][currentColumnCoordinate + 1]`) is strictly greater than `currentCellValue`, update `maximumStepsForCurrentCell` by taking the maximum of its current value and `1 + findMaxMovesFromCell(currentRowCoordinate + 1, currentColumnCoordinate + 1)`.
 *    d. Store the calculated `maximumStepsForCurrentCell` in `memoizationTable[currentRowCoordinate][currentColumnCoordinate]` and return it.
 * 3. In the main `maxMoves` function, initialize `overallMaximumMoves` to 0. Iterate through each `startRowIndex` from 0 to `numRows - 1`. For each `startRowIndex`, call `findMaxMovesFromCell(startRowIndex, 0)` to determine the maximum moves possible starting from that cell in the first column. Update `overallMaximumMoves` with the maximum value found across all starting cells.
 * 4. Return the final `overallMaximumMoves`.
 * Dry Run: grid = [[2,3,4],[5,6,7],[8,9,10]]
 * numRows = 3, numColumns = 3
 * memoizationTable = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
 * overallMaximumMoves = 0
 *
 * Loop startRowIndex = 0:
 *   Call findMaxMovesFromCell(0, 0):
 *     currentCellValue = grid[0][0] = 2. maximumStepsForCurrentCell = 0.
 *     - Try up-right (-1, 1): Invalid row (nextRowUp < 0).
 *     - Try straight right (0, 1): grid[0][1] = 3. 3 > 2. Valid.
 *       Call findMaxMovesFromCell(0, 1):
 *         currentCellValue = grid[0][1] = 3. internalMaxStepsOne = 0.
 *         - Try up-right (-1, 2): Invalid row.
 *         - Try straight right (0, 2): grid[0][2] = 4. 4 > 3. Valid.
 *           Call findMaxMovesFromCell(0, 2): currentColumnCoordinate (2) is last column. Returns 0.
 *           internalMaxStepsOne = Math.max(0, 1 + 0) = 1.
 *         - Try down-right (1, 2): grid[1][2] = 7. 7 > 3. Valid.
 *           Call findMaxMovesFromCell(1, 2): currentColumnCoordinate (2) is last column. Returns 0.
 *           internalMaxStepsOne = Math.max(1, 1 + 0) = 1.
 *         memoizationTable[0][1] = 1. Return 1.
 *       maximumStepsForCurrentCell = Math.max(0, 1 + 1) = 2.
 *     - Try down-right (1, 1): grid[1][1] = 6. 6 > 2. Valid.
 *       Call findMaxMovesFromCell(1, 1):
 *         currentCellValue = grid[1][1] = 6. internalMaxStepsTwo = 0.
 *         - Try up-right (0, 2): grid[0][2] = 4. 4 is NOT > 6. Invalid.
 *         - Try straight right (1, 2): grid[1][2] = 7. 7 > 6. Valid.
 *           Call findMaxMovesFromCell(1, 2): Returns 0.
 *           internalMaxStepsTwo = Math.max(0, 1 + 0) = 1.
 *         - Try down-right (2, 2): grid[2][2] = 10. 10 > 6. Valid.
 *           Call findMaxMovesFromCell(2, 2): Returns 0.
 *           internalMaxStepsTwo = Math.max(1, 1 + 0) = 1.
 *         memoizationTable[1][1] = 1. Return 1.
 *       maximumStepsForCurrentCell = Math.max(2, 1 + 1) = 2.
 *     memoizationTable[0][0] = 2. Return 2.
 *   overallMaximumMoves = Math.max(0, 2) = 2.
 *
 * Loop startRowIndex = 1:
 *   Call findMaxMovesFromCell(1, 0):
 *     currentCellValue = grid[1][0] = 5. maximumStepsForCellTwo = 0.
 *     - Try up-right (0, 1): grid[0][1] = 3. 3 is NOT > 5. Invalid.
 *     - Try straight right (1, 1): grid[1][1] = 6. 6 > 5. Valid.
 *       Call findMaxMovesFromCell(1, 1): memoizationTable[1][1] is 1. Returns 1.
 *       maximumStepsForCellTwo = Math.max(0, 1 + 1) = 2.
 *     - Try down-right (2, 1): grid[2][1] = 9. 9 > 5. Valid.
 *       Call findMaxMovesFromCell(2, 1):
 *         currentCellValue = grid[2][1] = 9. internalMaxStepsThree = 0.
 *         - Try up-right (1, 2): grid[1][2] = 7. 7 is NOT > 9. Invalid.
 *         - Try straight right (2, 2): grid[2][2] = 10. 10 > 9. Valid.
 *           Call findMaxMovesFromCell(2, 2): Returns 0.
 *           internalMaxStepsThree = Math.max(0, 1 + 0) = 1.
 *         - Try down-right (3, 2): Invalid row.
 *         memoizationTable[2][1] = 1. Return 1.
 *       maximumStepsForCellTwo = Math.max(2, 1 + 1) = 2.
 *     memoizationTable[1][0] = 2. Return 2.
 *   overallMaximumMoves = Math.max(2, 2) = 2.
 *
 * Loop startRowIndex = 2:
 *   Call findMaxMovesFromCell(2, 0):
 *     currentCellValue = grid[2][0] = 8. maximumStepsForCellThree = 0.
 *     - Try up-right (1, 1): grid[1][1] = 6. 6 is NOT > 8. Invalid.
 *     - Try straight right (2, 1): grid[2][1] = 9. 9 > 8. Valid.
 *       Call findMaxMovesFromCell(2, 1): memoizationTable[2][1] is 1. Returns 1.
 *       maximumStepsForCellThree = Math.max(0, 1 + 1) = 2.
 *     - Try down-right (3, 1): Invalid row.
 *     memoizationTable[2][0] = 2. Return 2.
 *   overallMaximumMoves = Math.max(2, 2) = 2.
 *
 * All initial rows processed. Final overallMaximumMoves = 2.
 * Time Complexity: O(M * N)
 * Space Complexity: O(M * N)
 */
var maxMoves = function (grid) {
  const numRows = grid.length;
  const numColumns = grid[0].length;
  const memoizationTable = Array.from({ length: numRows }, () =>
    new Array(numColumns).fill(-1),
  );

  let overallMaximumMoves = 0;
  for (let initialRow = 0; initialRow < numRows; initialRow++) {
    overallMaximumMoves = Math.max(
      overallMaximumMoves,
      findMaxMovesFromCell(initialRow, 0),
    );
  }

  return overallMaximumMoves;

  function findMaxMovesFromCell(currentRowCoordinate, currentColumnCoordinate) {
    if (currentColumnCoordinate === numColumns - 1) {
      return 0;
    }
    if (
      memoizationTable[currentRowCoordinate][currentColumnCoordinate] !== -1
    ) {
      return memoizationTable[currentRowCoordinate][currentColumnCoordinate];
    }

    let maximumStepsForCurrentCell = 0;
    const currentCellValue =
      grid[currentRowCoordinate][currentColumnCoordinate];

    const nextRowUp = currentRowCoordinate - 1;
    const nextColumnIndexUp = currentColumnCoordinate + 1;
    if (
      nextRowUp >= 0 &&
      nextColumnIndexUp < numColumns &&
      grid[nextRowUp][nextColumnIndexUp] > currentCellValue
    ) {
      maximumStepsForCurrentCell = Math.max(
        maximumStepsForCurrentCell,
        1 + findMaxMovesFromCell(nextRowUp, nextColumnIndexUp),
      );
    }

    const straightRightRow = currentRowCoordinate;
    const straightRightColumn = currentColumnCoordinate + 1;
    if (
      straightRightColumn < numColumns &&
      grid[straightRightRow][straightRightColumn] > currentCellValue
    ) {
      maximumStepsForCurrentCell = Math.max(
        maximumStepsForCurrentCell,
        1 + findMaxMovesFromCell(straightRightRow, straightRightColumn),
      );
    }

    const nextRowDown = currentRowCoordinate + 1;
    const nextColumnIndexDown = currentColumnCoordinate + 1;
    if (
      nextRowDown < numRows &&
      nextColumnIndexDown < numColumns &&
      grid[nextRowDown][nextColumnIndexDown] > currentCellValue
    ) {
      maximumStepsForCurrentCell = Math.max(
        maximumStepsForCurrentCell,
        1 + findMaxMovesFromCell(nextRowDown, nextColumnIndexDown),
      );
    }

    memoizationTable[currentRowCoordinate][currentColumnCoordinate] =
      maximumStepsForCurrentCell;
    return maximumStepsForCurrentCell;
  }
};

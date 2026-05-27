/**
 * Remove All Ones With Row And Column Flips
 * Intuition: We can determine a unique set of column flips by forcing the first row to be all zeros. After these column flips, every other row must either be all zeros or all ones to allow a single row flip to clear it.
 * Approach: 1. Store the first row as a reference. 2. Iterate through each subsequent row. 3. For each row, check if it's identical to the first row or if it's the exact opposite of the first row. 4. If any row is neither identical nor its exact opposite, return `false`. 5. If all rows satisfy this condition, return `true`.
 * Dry Run: grid = [[0,1,0],[1,0,1],[0,1,0]]
 *   gridLength = 3, rowLength = 3
 *   initialRow = [0,1,0]
 *   rowIndex = 1: (current row = [1,0,1])
 *     isSamePattern = true, isOppositePattern = true
 *     columnIndex = 0: currentElement = 1, initialElement = 0. Not equal -> isSamePattern = false. Not equal is true, equal is false -> isOppositePattern remains true.
 *     columnIndex = 1: currentElement = 0, initialElement = 1. Not equal -> isSamePattern = false. Not equal is true, equal is false -> isOppositePattern remains true.
 *     columnIndex = 2: currentElement = 1, initialElement = 0. Not equal -> isSamePattern = false. Not equal is true, equal is false -> isOppositePattern remains true.
 *     After inner loop: isSamePattern = false, isOppositePattern = true. Condition `!isSamePattern && !isOppositePattern` (true && false) is false. Continue.
 *   rowIndex = 2: (current row = [0,1,0])
 *     isSamePattern = true, isOppositePattern = true
 *     columnIndex = 0: currentElement = 0, initialElement = 0. Equal -> isOppositePattern = false. Equal is true, not equal is false -> isSamePattern remains true.
 *     columnIndex = 1: currentElement = 1, initialElement = 1. Equal -> isOppositePattern = false. Equal is true, not equal is false -> isSamePattern remains true.
 *     columnIndex = 2: currentElement = 0, initialElement = 0. Equal -> isOppositePattern = false. Equal is true, not equal is false -> isSamePattern remains true.
 *     After inner loop: isSamePattern = true, isOppositePattern = false. Condition `!isSamePattern && !isOppositePattern` (false && true) is false. Continue.
 *   Outer loop finishes. Return true.
 * Time Complexity: O(M * N)
 * Space Complexity: O(1)
 */
var removeOnes = function (grid) {
  const gridLength = grid.length;
  const rowLength = grid[0].length;
  const initialRow = grid[0];

  for (let rowIndex = 1; rowIndex < gridLength; rowIndex++) {
    let isSamePattern = true;
    let isOppositePattern = true;

    for (let columnIndex = 0; columnIndex < rowLength; columnIndex++) {
      if (grid[rowIndex][columnIndex] !== initialRow[columnIndex]) {
        isSamePattern = false;
      }
      if (grid[rowIndex][columnIndex] === initialRow[columnIndex]) {
        isOppositePattern = false;
      }
    }

    if (!isSamePattern && !isOppositePattern) {
      return false;
    }
  }

  return true;
};

/**
 * Valid Sudoku
 * Intuition: One pass records each filled digit in its row Set, column Set, and 3×3 box Set (`floor(r/3)*3 + floor(c/3)`); a second insert of the same digit in any of those Sets is invalid.
 * Approach: 1. Create 9 Sets each for rows, columns, and boxes. 2. Scan all cells; skip `'.'`. 3. Compute `boxIdentifier`. 4. If the digit is already in any of the three Sets, return false; else add it. 5. Return true.
 * Dry Run: a 9×9 board with two '5's in row 0.
 *   - First '5' added to rowTrackers[0]. Second '5' hits `.has` → return false.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var isValidSudoku = function (board) {
  const rowTrackers = new Array(9).fill(null).map(() => new Set());
  const columnTrackers = new Array(9).fill(null).map(() => new Set());
  const boxTrackers = new Array(9).fill(null).map(() => new Set());

  for (let currentGridRow = 0; currentGridRow < 9; currentGridRow++) {
    for (
      let currentGridColumn = 0;
      currentGridColumn < 9;
      currentGridColumn++
    ) {
      const cellContent = board[currentGridRow][currentGridColumn];

      if (cellContent !== ".") {
        const boxIdentifier =
          Math.floor(currentGridRow / 3) * 3 +
          Math.floor(currentGridColumn / 3);

        if (
          rowTrackers[currentGridRow].has(cellContent) ||
          columnTrackers[currentGridColumn].has(cellContent) ||
          boxTrackers[boxIdentifier].has(cellContent)
        ) {
          return false;
        }

        rowTrackers[currentGridRow].add(cellContent);
        columnTrackers[currentGridColumn].add(cellContent);
        boxTrackers[boxIdentifier].add(cellContent);
      }
    }
  }

  return true;
};

/**
 * Sudoku Solver
 * Intuition: DFS fills the first empty cell with digits 1–9 that pass `checkValidity` (row, column, and 3×3 box), recurses, and backtracks by restoring `'.'` on failure until the board is complete.
 * Approach: 1. `checkValidity` scans 9 positions for row, column, and mapped box cell. 2. `backtrackSolve` finds the next `'.'`. 3. Try each digit string; if valid, write it and recurse. 4. On recursive success return true; else undo. 5. If no digit works return false; if no empty cells remain return true. Call `backtrackSolve(board)`.
 * Dry Run: a nearly full board with one empty cell that can only be "4".
 *   - Find '.', try 1–3 invalid, place "4", recurse finds no empties → true. Board solved.
 * Time Complexity: O(9^(N*N))
 * Space Complexity: O(N*N)
 */
var solveSudoku = function (board) {
  const checkValidity = (gridConfig, targetRow, targetCol, potentialValue) => {
    for (let indexIterator = 0; indexIterator < 9; indexIterator++) {
      if (gridConfig[targetRow][indexIterator] === potentialValue) {
        return false;
      }
      if (gridConfig[indexIterator][targetCol] === potentialValue) {
        return false;
      }

      let boxStartRow = 3 * Math.floor(targetRow / 3);
      let boxStartCol = 3 * Math.floor(targetCol / 3);
      let subGridRowCoord = boxStartRow + Math.floor(indexIterator / 3);
      let subGridColCoord = boxStartCol + (indexIterator % 3);

      if (gridConfig[subGridRowCoord][subGridColCoord] === potentialValue) {
        return false;
      }
    }
    return true;
  };

  const backtrackSolve = (currentGrid) => {
    for (let rowCoord = 0; rowCoord < 9; rowCoord++) {
      for (let colCoord = 0; colCoord < 9; colCoord++) {
        if (currentGrid[rowCoord][colCoord] === ".") {
          for (let digitOption = 1; digitOption <= 9; digitOption++) {
            let digitAsString = String(digitOption);
            let canPlaceHere = checkValidity(
              currentGrid,
              rowCoord,
              colCoord,
              digitAsString
            );
            if (canPlaceHere) {
              currentGrid[rowCoord][colCoord] = digitAsString;
              let recursiveSuccess = backtrackSolve(currentGrid);
              if (recursiveSuccess) {
                return true;
              }
              currentGrid[rowCoord][colCoord] = ".";
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  backtrackSolve(board);
};

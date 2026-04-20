/**
 * Sudoku Solver
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
              digitAsString,
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

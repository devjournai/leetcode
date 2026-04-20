/**
 * Candy Crush
 * Time Complexity: O((M * N)^2)
 * Space Complexity: O(1)
 */
var candyCrush = function (board) {
  const boardRowCount = board.length;
  const boardColCount = board[0].length;

  while (performCrushAndMark()) {
    applyGravitySimulation();
  }

  return board;

  function performCrushAndMark() {
    let crushablesFound = false;

    for (
      let currentRowIndex = 0;
      currentRowIndex < boardRowCount;
      currentRowIndex++
    ) {
      for (
        let currentColIndex = 0;
        currentColIndex < boardColCount - 2;
        currentColIndex++
      ) {
        const horizontalCandyType = Math.abs(
          board[currentRowIndex][currentColIndex],
        );
        if (
          horizontalCandyType !== 0 &&
          horizontalCandyType ===
            Math.abs(board[currentRowIndex][currentColIndex + 1]) &&
          horizontalCandyType ===
            Math.abs(board[currentRowIndex][currentColIndex + 2])
        ) {
          crushablesFound = true;
          board[currentRowIndex][currentColIndex] = -horizontalCandyType;
          board[currentRowIndex][currentColIndex + 1] = -horizontalCandyType;
          board[currentRowIndex][currentColIndex + 2] = -horizontalCandyType;
        }
      }
    }

    for (
      let currentColumnIndex = 0;
      currentColumnIndex < boardColCount;
      currentColumnIndex++
    ) {
      for (
        let currentVerticalRowIndex = 0;
        currentVerticalRowIndex < boardRowCount - 2;
        currentVerticalRowIndex++
      ) {
        const verticalCandyType = Math.abs(
          board[currentVerticalRowIndex][currentColumnIndex],
        );
        if (
          verticalCandyType !== 0 &&
          verticalCandyType ===
            Math.abs(board[currentVerticalRowIndex + 1][currentColumnIndex]) &&
          verticalCandyType ===
            Math.abs(board[currentVerticalRowIndex + 2][currentColumnIndex])
        ) {
          crushablesFound = true;
          board[currentVerticalRowIndex][currentColumnIndex] =
            -verticalCandyType;
          board[currentVerticalRowIndex + 1][currentColumnIndex] =
            -verticalCandyType;
          board[currentVerticalRowIndex + 2][currentColumnIndex] =
            -verticalCandyType;
        }
      }
    }

    return crushablesFound;
  }

  function applyGravitySimulation() {
    for (
      let columnIterator = 0;
      columnIterator < boardColCount;
      columnIterator++
    ) {
      let writeTargetRow = boardRowCount - 1;
      for (
        let readSourceRow = boardRowCount - 1;
        readSourceRow >= 0;
        readSourceRow--
      ) {
        if (board[readSourceRow][columnIterator] > 0) {
          board[writeTargetRow][columnIterator] =
            board[readSourceRow][columnIterator];
          if (writeTargetRow !== readSourceRow) {
            board[readSourceRow][columnIterator] = 0;
          }
          writeTargetRow--;
        } else if (board[readSourceRow][columnIterator] < 0) {
          board[readSourceRow][columnIterator] = 0;
        }
      }
    }
  }
};

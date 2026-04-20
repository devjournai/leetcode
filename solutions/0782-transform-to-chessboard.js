/**
 * Transform To Chessboard
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var movesToChessboard = function (board) {
  const boardDimension = board.length;

  for (
    let currentGridRow = 0;
    currentGridRow < boardDimension;
    currentGridRow++
  ) {
    for (
      let currentGridCol = 0;
      currentGridCol < boardDimension;
      currentGridCol++
    ) {
      if (
        (board[0][0] ^
          board[currentGridRow][0] ^
          board[0][currentGridCol] ^
          board[currentGridRow][currentGridCol]) ===
        1
      ) {
        return -1;
      }
    }
  }

  let firstRowElementSum = 0;
  let firstColElementSum = 0;
  let rowZeroPatternMismatches = 0;
  let colZeroPatternMismatches = 0;

  for (let indexValue = 0; indexValue < boardDimension; indexValue++) {
    firstRowElementSum += board[0][indexValue];
    firstColElementSum += board[indexValue][0];

    if (board[indexValue][0] === indexValue % 2) {
      rowZeroPatternMismatches++;
    }
    if (board[0][indexValue] === indexValue % 2) {
      colZeroPatternMismatches++;
    }
  }

  const requiredLowerCount = Math.floor(boardDimension / 2);
  const requiredUpperCount = Math.ceil(boardDimension / 2);

  if (
    firstRowElementSum !== requiredLowerCount &&
    firstRowElementSum !== requiredUpperCount
  ) {
    return -1;
  }
  if (
    firstColElementSum !== requiredLowerCount &&
    firstColElementSum !== requiredUpperCount
  ) {
    return -1;
  }

  let finalRowMoves = 0;
  let finalColMoves = 0;

  if (boardDimension % 2 === 1) {
    if (rowZeroPatternMismatches % 2 === 1) {
      finalRowMoves = boardDimension - rowZeroPatternMismatches;
    } else {
      finalRowMoves = rowZeroPatternMismatches;
    }

    if (colZeroPatternMismatches % 2 === 1) {
      finalColMoves = boardDimension - colZeroPatternMismatches;
    } else {
      finalColMoves = colZeroPatternMismatches;
    }
  } else {
    finalRowMoves = Math.min(
      rowZeroPatternMismatches,
      boardDimension - rowZeroPatternMismatches,
    );
    finalColMoves = Math.min(
      colZeroPatternMismatches,
      boardDimension - colZeroPatternMismatches,
    );
  }

  return Math.floor((finalRowMoves + finalColMoves) / 2);
};

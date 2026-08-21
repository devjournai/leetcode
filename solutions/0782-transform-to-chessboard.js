/**
 * Transform To Chessboard
 * Intuition: A chessboard is reachable by row/column swaps iff every 2×2 has even parity (XOR of four corners is 0) and each row/column has about n/2 ones. Count mismatches vs the 0101… pattern; min swaps is half the row+col mismatch counts (odd n forces the even-mismatch choice).
 * Approach: 1. If any `board[0][0] ^ board[r][0] ^ board[0][c] ^ board[r][c] === 1`, return -1. 2. Sum first row/col ones; count `rowZeroPatternMismatches` / `colZeroPatternMismatches` where value equals `index % 2`. 3. Ones count must be `floor(n/2)` or `ceil(n/2)`. 4. Odd n: if mismatch count is odd, use `n - mismatches`; even n: min of mismatches and n-mismatches. Return `floor((rowMoves + colMoves) / 2)`.
 * Dry Run: board = [[0,1,1,0],[0,1,1,0],[1,0,0,1],[1,0,0,1]].
 *   - Corner XORs are 0; first row sum 2, first col sum 2 (n/2).
 *   - Row mismatches vs 0101: 2, col: 2. Even n → min(2,2)=2 each. Return floor(4/2)=2.
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
      boardDimension - rowZeroPatternMismatches
    );
    finalColMoves = Math.min(
      colZeroPatternMismatches,
      boardDimension - colZeroPatternMismatches
    );
  }

  return Math.floor((finalRowMoves + finalColMoves) / 2);
};

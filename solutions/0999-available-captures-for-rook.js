/**
 * Available Captures For Rook
 * Intuition: From 'R', scan four rays. First 'p' is a capture; first 'B' blocks.
 * Approach: 1. Locate rook. 2. For each of `moveDirections`, `checkDirectionForCapture` walks until off-board, returning 1 on pawn, 0 on bishop. 3. Sum captures.
 * Dry Run: Rook at (0,0) with pawn at (0,3) and empty in between. East ray returns 1. Other rays 0. Answer 1.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var numRookCaptures = function (board) {
  let rookPositionRow;
  let rookPositionCol;

  for (let firstIndex = 0; firstIndex < 8; firstIndex++) {
    for (let secondIndex = 0; secondIndex < 8; secondIndex++) {
      if (board[firstIndex][secondIndex] === "R") {
        rookPositionRow = firstIndex;
        rookPositionCol = secondIndex;
        break;
      }
    }
    if (rookPositionRow !== undefined) {
      break;
    }
  }

  let totalCaptures = 0;
  const moveDirections = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
  ];

  const checkDirectionForCapture = (startRow, startCol, rowStep, colStep) => {
    let currentScanRow = startRow + rowStep;
    let currentScanCol = startCol + colStep;

    while (
      currentScanRow >= 0 &&
      currentScanRow < 8 &&
      currentScanCol >= 0 &&
      currentScanCol < 8
    ) {
      if (board[currentScanRow][currentScanCol] === "p") {
        return 1;
      }
      if (board[currentScanRow][currentScanCol] === "B") {
        return 0;
      }
      currentScanRow += rowStep;
      currentScanCol += colStep;
    }
    return 0;
  };

  for (const directionVector of moveDirections) {
    const deltaRow = directionVector[0];
    const deltaCol = directionVector[1];
    totalCaptures += checkDirectionForCapture(
      rookPositionRow,
      rookPositionCol,
      deltaRow,
      deltaCol
    );
  }

  return totalCaptures;
};

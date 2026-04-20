/**
 * Available Captures For Rook
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
      deltaCol,
    );
  }

  return totalCaptures;
};

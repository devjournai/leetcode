/**
 * Surrounded Regions
 * Intuition: Any 'O' connected to the border cannot be flipped. Mark those regions first, then flip remaining 'O's to 'X' and restore the marked cells.
 * Approach: 1. Empty board returns. 2. For every border 'O', DFS-mark it and 4-neighbors as 'U'. 3. Scan the board: 'U' → 'O', leftover 'O' → 'X'.
 * Dry Run: 4x4 with a ring of X and an interior O, plus a border O. Border-connected O stays O (via U). Fully enclosed O becomes X.
 * Time Complexity: O(R * C)
 * Space Complexity: O(R * C)
 */
var solve = function (board) {
  const totalRows = board.length;
  if (totalRows === 0) {
    return;
  }
  const totalCols = board[0].length;

  const uncapturableMarker = "U";

  for (
    let currentBorderRow = 0;
    currentBorderRow < totalRows;
    currentBorderRow++
  ) {
    for (
      let currentBorderCol = 0;
      currentBorderCol < totalCols;
      currentBorderCol++
    ) {
      const isBorderCell =
        currentBorderRow === 0 ||
        currentBorderRow === totalRows - 1 ||
        currentBorderCol === 0 ||
        currentBorderCol === totalCols - 1;
      if (board[currentBorderRow][currentBorderCol] === "O" && isBorderCell) {
        markUnflippable(currentBorderRow, currentBorderCol);
      }
    }
  }

  for (let finalRowScan = 0; finalRowScan < totalRows; finalRowScan++) {
    for (let finalColScan = 0; finalColScan < totalCols; finalColScan++) {
      if (board[finalRowScan][finalColScan] === uncapturableMarker) {
        board[finalRowScan][finalColScan] = "O";
      } else if (board[finalRowScan][finalColScan] === "O") {
        board[finalRowScan][finalColScan] = "X";
      }
    }
  }

  function markUnflippable(startRow, startCol) {
    if (
      startRow < 0 ||
      startRow >= totalRows ||
      startCol < 0 ||
      startCol >= totalCols ||
      board[startRow][startCol] !== "O"
    ) {
      return;
    }

    board[startRow][startCol] = uncapturableMarker;

    const rowOffsets = [-1, 1, 0, 0];
    const colOffsets = [0, 0, -1, 1];

    for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
      const neighborRow = startRow + rowOffsets[directionIndex];
      const neighborCol = startCol + colOffsets[directionIndex];
      markUnflippable(neighborRow, neighborCol);
    }
  }
};

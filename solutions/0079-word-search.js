/**
 * Word Search
 * Intuition: The word must form a 4-direction path of adjacent unused cells; DFS from every cell that matches the first letter, marking the current cell so it cannot be reused on this path.
 * Approach: 1. From each board cell equal to word[0], call `backtrackSearch`. 2. Mismatch returns false; last index match returns true. 3. Temporarily write `-` on the cell, try up/right/down/left, then restore the letter.
 * Dry Run: board=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word="ABCCED" → A-B-C-C-E-D path found → true
 * Time Complexity: O(R * C * 3^L)
 * Space Complexity: O(L)
 */
var exist = function (board, word) {
  const boardTotalRows = board.length;
  const boardTotalCols = board[0].length;
  const targetWordLength = word.length;
  const visitedPathMarker = "-";

  function backtrackSearch(currentRowCoord, currentColCoord, wordCharIndex) {
    if (board[currentRowCoord][currentColCoord] !== word[wordCharIndex]) {
      return false;
    }
    if (wordCharIndex === targetWordLength - 1) {
      return true;
    }

    const initialCellCharacter = board[currentRowCoord][currentColCoord];
    board[currentRowCoord][currentColCoord] = visitedPathMarker;

    const directionalOffsets = [
      [-1, 0],
      [0, 1],
      [1, 0],
      [0, -1],
    ];
    for (const singleDirectionVector of directionalOffsets) {
      const rowOffset = singleDirectionVector[0];
      const colOffset = singleDirectionVector[1];
      const nextRowPosition = currentRowCoord + rowOffset;
      const nextColPosition = currentColCoord + colOffset;

      const isRowValid =
        nextRowPosition >= 0 && nextRowPosition < boardTotalRows;
      const isColValid =
        nextColPosition >= 0 && nextColPosition < boardTotalCols;

      if (isRowValid && isColValid) {
        if (
          backtrackSearch(nextRowPosition, nextColPosition, wordCharIndex + 1)
        ) {
          return true;
        }
      }
    }

    board[currentRowCoord][currentColCoord] = initialCellCharacter;
    return false;
  }

  for (
    let initialRowIndex = 0;
    initialRowIndex < boardTotalRows;
    initialRowIndex++
  ) {
    for (
      let initialColIndex = 0;
      initialColIndex < boardTotalCols;
      initialColIndex++
    ) {
      if (board[initialRowIndex][initialColIndex] === word[0]) {
        if (backtrackSearch(initialRowIndex, initialColIndex, 0)) {
          return true;
        }
      }
    }
  }

  return false;
};

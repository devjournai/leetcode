/**
 * Check If Word Can Be Placed In Crossword
 * Intuition: A word can be placed if it fits into a continuous empty or matching cell segment of the correct length, and this segment is properly bounded by '#' characters or the board edges.
 * Approach: 1. Initialize board dimensions and word length. 2. Define a helper function, `checkSegment`, to verify if a word can be placed starting at a given cell and moving in a specific direction. This function first checks if each letter of the word fits in sequence (boundary, block, match checks). Then, it checks if the cells immediately preceding and succeeding the word segment are boundaries or '#'. 3. Iterate through every cell of the board using nested loops. 4. For each cell, attempt to place the word in four directions: right (0, 1), left (0, -1), down (1, 0), and up (-1, 0) by calling `checkSegment`. 5. If `checkSegment` returns true for any attempt, immediately return true from the main function. 6. If all cells and all directions are checked without finding a valid placement, return false.
 * Dry Run:
 * board = [["#", " ", "#"], [" ", " ", " "], ["#", " ", "#"]]
 * word = "AB"
 *
 * boardHeight = 3, boardWidth = 3, targetWordLength = 2
 *
 * Main Loop:
 * r = 0, c = 0: board[0][0] is '#'. Not a valid start for any direction (first letter of word won't fit a '#').
 *
 * r = 0, c = 1: board[0][1] is ' '.
 *   checkSegment(0, 1, 0, 1, ...): (Right)
 *     letterIndex = 0: current cell (0,1). board[0][1] (' ') matches word[0] ('A'). Ok.
 *     letterIndex = 1: current cell (0,2). board[0][2] ('#'). Fails: segment check returns false.
 *
 *   checkSegment(0, 1, 0, -1, ...): (Left)
 *     letterIndex = 0: current cell (0,1). board[0][1] (' ') matches word[0] ('A'). Ok.
 *     letterIndex = 1: current cell (0,0). board[0][0] ('#'). Fails: segment check returns false.
 *
 *   checkSegment(0, 1, 1, 0, ...): (Down)
 *     letterIndex = 0: current cell (0,1). board[0][1] (' ') matches word[0] ('A'). Ok.
 *     letterIndex = 1: current cell (1,1). board[1][1] (' ') matches word[1] ('B'). Ok.
 *     Word segment (length 2) fits.
 *     Boundary check:
 *       precedingRow = 0-1 = -1 (out of bounds) -> preceding cell ok.
 *       succeedingRow = 0+2*1 = 2, succeedingCol = 1. board[2][1] (' ') is not '#'. Fails: boundary check returns false.
 *
 *   checkSegment(0, 1, -1, 0, ...): (Up)
 *     letterIndex = 0: current cell (0,1). board[0][1] (' ') matches word[0] ('A'). Ok.
 *     letterIndex = 1: current cell (-1,1) (out of bounds). Fails: segment check returns false.
 *
 * (Continues for r=0, c=2, r=1, c=0, etc.)
 *
 * Eventually, for r=1, c=1 (middle cell):
 *   board[1][1] is ' '.
 *   checkSegment(1, 1, 0, 1, ...): (Right)
 *     letterIndex = 0: (1,1) matches 'A'. Ok.
 *     letterIndex = 1: (1,2). board[1][2] (' '). Matches 'B'. Ok.
 *     Word segment fits.
 *     Boundary check:
 *       precedingRow = 1, precedingCol = 1-1 = 0. board[1][0] (' ') is not '#'. Fails: boundary check returns false.
 *
 * Let's consider `word = "C"` and `board = [["#", "C", "#"], [" ", " ", " "], ["#", " ", "#"]]`
 *
 * r = 0, c = 1: board[0][1] is 'C'.
 *   checkSegment(0, 1, 0, 1, ...): (Right)
 *     letterIndex = 0: current cell (0,1). board[0][1] ('C') matches word[0] ('C'). Ok.
 *     Word segment (length 1) fits.
 *     Boundary check:
 *       precedingRow = 0, precedingCol = 0. board[0][0] ('#') -> preceding cell ok.
 *       succeedingRow = 0, succeedingCol = 0+1*1 = 1. This would be (0,2). board[0][2] ('#') -> succeeding cell ok.
 *     All checks pass. `checkSegment` returns true.
 *     Main function returns true.
 *
 * Time Complexity: O(M * N * L)
 * Space Complexity: O(1)
 */
var placeWordInCrossword = function (board, word) {
  const boardHeight = board.length;
  const boardWidth = board[0].length;
  const targetWordLength = word.length;

  const checkSegment = (startRow, startCol, rowDelta, colDelta) => {
    for (
      let currentLetterPosition = 0;
      currentLetterPosition < targetWordLength;
      currentLetterPosition++
    ) {
      const calculatedRow = startRow + currentLetterPosition * rowDelta;
      const calculatedCol = startCol + currentLetterPosition * colDelta;

      if (
        calculatedRow < 0 ||
        calculatedRow >= boardHeight ||
        calculatedCol < 0 ||
        calculatedCol >= boardWidth
      ) {
        return false;
      }
      if (board[calculatedRow][calculatedCol] === "#") {
        return false;
      }
      if (
        board[calculatedRow][calculatedCol] !== " " &&
        board[calculatedRow][calculatedCol] !== word[currentLetterPosition]
      ) {
        return false;
      }
    }

    const precedingRow = startRow - rowDelta;
    const precedingCol = startCol - colDelta;

    const succeedingRow = startRow + targetWordLength * rowDelta;
    const succeedingCol = startCol + targetWordLength * colDelta;

    const isPrecedingValid =
      precedingRow >= 0 &&
      precedingRow < boardHeight &&
      precedingCol >= 0 &&
      precedingCol < boardWidth;
    const isSucceedingValid =
      succeedingRow >= 0 &&
      succeedingRow < boardHeight &&
      succeedingCol >= 0 &&
      succeedingCol < boardWidth;

    if (isPrecedingValid && board[precedingRow][precedingCol] !== "#") {
      return false;
    }
    if (isSucceedingValid && board[succeedingRow][succeedingCol] !== "#") {
      return false;
    }

    return true;
  };

  for (let rowIndex = 0; rowIndex < boardHeight; rowIndex++) {
    for (let colIndex = 0; colIndex < boardWidth; colIndex++) {
      if (
        checkSegment(rowIndex, colIndex, 0, 1) ||
        checkSegment(rowIndex, colIndex, 0, -1) ||
        checkSegment(rowIndex, colIndex, 1, 0) ||
        checkSegment(rowIndex, colIndex, -1, 0)
      ) {
        return true;
      }
    }
  }

  return false;
};

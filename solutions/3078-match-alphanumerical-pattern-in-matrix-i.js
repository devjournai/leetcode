/**
 * Match Alphanumerical Pattern In Matrix I
 * Intuition: Iterate through all possible top-left positions for a pattern match in the board. For each potential submatrix, verify if it adheres to the pattern's rules, which involve strict digit matching and consistent, unique letter-to-digit mappings.
 * Approach: 1. Determine dimensions of the board and pattern. 2. Iterate through all possible top-left coordinates (outerRowIndex, outerColIndex) in the board where the pattern could fit. 3. For each coordinate, call a helper function (checkPotentialMatch) to validate if the submatrix starting at that coordinate matches the pattern. 4. The helper function iterates through each element of the pattern and its corresponding board submatrix element. 5. If a pattern element is a digit, it must exactly match the board element. 6. If a pattern element is a letter, it must consistently map to the same digit wherever that letter appears in the pattern, and distinct letters must map to distinct digits. Use two maps for bidirectional mapping (letter to digit, digit to letter) to enforce these constraints. 7. If a match is found, return the top-left coordinate. 8. If no match is found after checking all possibilities, return [-1, -1].
 * Dry Run: For board = [[1,1],[2,2]], pattern = ["xx", "yy"]
 * boardHeight = 2, boardWidth = 2, patternHeight = 2, patternWidth = 2
 * outerRowIndex = 0, outerColIndex = 0:
 *   Call checkPotentialMatch(board, pattern, 0, 0):
 *     mapLetterToNumber = Map(), mapNumberToLetter = Map()
 *     currentPatternRow = 0:
 *       currentPatternCol = 0: patternSymbol = 'x', matrixValue = board[0][0] = 1
 *         determineIfCharIsDigit('x') is false.
 *         mapLetterToNumber.has('x') is false.
 *         mapNumberToLetter.has(1) is false.
 *         mapLetterToNumber.set('x', 1), mapNumberToLetter.set(1, 'x').
 *       currentPatternCol = 1: patternSymbol = 'x', matrixValue = board[0][1] = 1
 *         determineIfCharIsDigit('x') is false.
 *         mapLetterToNumber.has('x') is true.
 *         mapLetterToNumber.get('x') (which is 1) === 1. OK.
 *     currentPatternRow = 1:
 *       currentPatternCol = 0: patternSymbol = 'y', matrixValue = board[1][0] = 2
 *         determineIfCharIsDigit('y') is false.
 *         mapLetterToNumber.has('y') is false.
 *         mapNumberToLetter.has(2) is false.
 *         mapLetterToNumber.set('y', 2), mapNumberToLetter.set(2, 'y').
 *       currentPatternCol = 1: patternSymbol = 'y', matrixValue = board[1][1] = 2
 *         determineIfCharIsDigit('y') is false.
 *         mapLetterToNumber.has('y') is true.
 *         mapLetterToNumber.get('y') (which is 2) === 2. OK.
 *     All checks pass. checkPotentialMatch returns true.
 *   findPattern returns [0, 0].
 * Time Complexity: O(R * C * r * c)
 * Space Complexity: O(1)
 */
var findPattern = function (board, pattern) {
  const boardHeight = board.length;
  const boardWidth = board[0].length;
  const patternHeight = pattern.length;
  const patternWidth = pattern[0].length;

  for (
    let outerRowIndex = 0;
    outerRowIndex <= boardHeight - patternHeight;
    outerRowIndex++
  ) {
    for (
      let outerColIndex = 0;
      outerColIndex <= boardWidth - patternWidth;
      outerColIndex++
    ) {
      if (checkPotentialMatch(board, pattern, outerRowIndex, outerColIndex)) {
        return [outerRowIndex, outerColIndex];
      }
    }
  }

  return [-1, -1];

  function checkPotentialMatch(
    boardInput,
    patternInput,
    currentStartRow,
    currentStartCol,
  ) {
    const mapLetterToNumber = new Map();
    const mapNumberToLetter = new Map();

    for (
      let currentPatternRow = 0;
      currentPatternRow < patternInput.length;
      currentPatternRow++
    ) {
      for (
        let currentPatternCol = 0;
        currentPatternCol < patternInput[0].length;
        currentPatternCol++
      ) {
        const patternSymbol =
          patternInput[currentPatternRow][currentPatternCol];
        const matrixValue =
          boardInput[currentStartRow + currentPatternRow][
            currentStartCol + currentPatternCol
          ];

        if (determineIfCharIsDigit(patternSymbol)) {
          if (parseInt(patternSymbol) !== matrixValue) {
            return false;
          }
        } else {
          if (mapLetterToNumber.has(patternSymbol)) {
            if (mapLetterToNumber.get(patternSymbol) !== matrixValue) {
              return false;
            }
          } else {
            if (mapNumberToLetter.has(matrixValue)) {
              return false;
            }
            mapLetterToNumber.set(patternSymbol, matrixValue);
            mapNumberToLetter.set(matrixValue, patternSymbol);
          }
        }
      }
    }

    return true;
  }

  function determineIfCharIsDigit(characterInput) {
    return characterInput >= "0" && characterInput <= "9";
  }
};

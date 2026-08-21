/**
 * Alphabet Board Path
 * Intuition: Letters sit on a 5-wide board (z hangs at (5,0)). Path from current cell is U/L before D/R so we never step off the board at z.
 * Approach: 1. Map char to (row,col) via (code/5, code%5). 2. Emit U then L then D then R for the deltas, then '!'. 3. Update current position.
 * Dry Run: target = "leet".
 *   - a(0,0)->l(2,1): DDR!. l->e(0,4): UURRR!. e->e: !. e->t(3,4): DDD!.
 *   - Answer DDR!UURRR!!DDD!.
 * Time Complexity: O(N * (R + C))
 * Space Complexity: O(N * (R + C))
 */
var alphabetBoardPath = function (targetWord) {
  let pathSegments = [];
  let currentRowPosition = 0;
  let currentColPosition = 0;

  for (let charIndex = 0; charIndex < targetWord.length; ++charIndex) {
    const currentTargetChar = targetWord[charIndex];
    const charAsciiCode = currentTargetChar.charCodeAt(0) - "a".charCodeAt(0);

    const destinationRow = Math.floor(charAsciiCode / 5);
    const destinationCol = charAsciiCode % 5;

    let rowDifference = currentRowPosition - destinationRow;
    let colDifference = currentColPosition - destinationCol;

    if (rowDifference > 0) {
      for (
        let upMoveCounter = 0;
        upMoveCounter < rowDifference;
        ++upMoveCounter
      ) {
        pathSegments.push("U");
      }
    }

    if (colDifference > 0) {
      for (
        let leftMoveCounter = 0;
        leftMoveCounter < colDifference;
        ++leftMoveCounter
      ) {
        pathSegments.push("L");
      }
    }

    if (rowDifference < 0) {
      for (
        let downMoveCounter = 0;
        downMoveCounter < -rowDifference;
        ++downMoveCounter
      ) {
        pathSegments.push("D");
      }
    }

    if (colDifference < 0) {
      for (
        let rightMoveCounter = 0;
        rightMoveCounter < -colDifference;
        ++rightMoveCounter
      ) {
        pathSegments.push("R");
      }
    }

    pathSegments.push("!");

    currentRowPosition = destinationRow;
    currentColPosition = destinationCol;
  }

  return pathSegments.join("");
};

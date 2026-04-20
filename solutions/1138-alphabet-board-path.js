/**
 * Alphabet Board Path
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

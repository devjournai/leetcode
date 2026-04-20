/**
 * Snakes And Ladders
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var snakesAndLadders = function (board) {
  const boardLengthValue = board.length;
  const maxSquareNumber = boardLengthValue * boardLengthValue;
  const squaresToVisitQueue = [1];
  const visitedPathNodes = new Set([1]);
  let minimumRolls = 0;

  const calculateCellCoordinates = (coordInputSquare, gridSizeParameter) => {
    const zeroIndexedValue = coordInputSquare - 1;
    const invertedRowIndex = Math.floor(zeroIndexedValue / gridSizeParameter);
    const absoluteBoardRow = gridSizeParameter - 1 - invertedRowIndex;

    const isOddRowFromBottom = invertedRowIndex % 2 !== 0;
    let calculatedBoardColumn;

    if (isOddRowFromBottom) {
      calculatedBoardColumn =
        gridSizeParameter - 1 - (zeroIndexedValue % gridSizeParameter);
    } else {
      calculatedBoardColumn = zeroIndexedValue % gridSizeParameter;
    }
    return [absoluteBoardRow, calculatedBoardColumn];
  };

  while (squaresToVisitQueue.length > 0) {
    const currentLevelCount = squaresToVisitQueue.length;

    for (
      let levelTraversalIndex = 0;
      levelTraversalIndex < currentLevelCount;
      levelTraversalIndex++
    ) {
      const currentLocationSquare = squaresToVisitQueue.shift();

      if (currentLocationSquare === maxSquareNumber) {
        return minimumRolls;
      }

      for (let diceOutcome = 1; diceOutcome <= 6; diceOutcome++) {
        const possibleNextSquare = currentLocationSquare + diceOutcome;

        if (possibleNextSquare > maxSquareNumber) {
          continue;
        }

        const [targetCellRow, targetCellCol] = calculateCellCoordinates(
          possibleNextSquare,
          boardLengthValue,
        );

        const finalMoveDestination =
          board[targetCellRow][targetCellCol] === -1
            ? possibleNextSquare
            : board[targetCellRow][targetCellCol];

        if (!visitedPathNodes.has(finalMoveDestination)) {
          visitedPathNodes.add(finalMoveDestination);
          squaresToVisitQueue.push(finalMoveDestination);
        }
      }
    }
    minimumRolls++;
  }

  return -1;
};

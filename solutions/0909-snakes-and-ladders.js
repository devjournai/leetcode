/**
 * Snakes And Ladders
 * Intuition: BFS on square numbers 1..n². A dice roll 1..6 lands on a boustrophedon cell; if that cell is not -1, teleport. First time we dequeue n² is the minimum rolls.
 * Approach: 1. `calculateCellCoordinates` maps square to (row, col) from the bottom, reversing the column on odd rows-from-bottom. 2. Queue starts at 1, `visitedPathNodes` has 1. 3. Level-order: for each square, if it is n² return `minimumRolls`; else try +1..+6, skip > n², dest = board or the square itself, enqueue if unvisited. 4. Increment rolls per level. Empty queue → -1.
 * Dry Run: board = [[-1,-1],[-1,3]] (n=2, goal 4).
 *   - From 1 a roll of 3 lands on 4 with dest -1. Dequeue 4 at rolls=1 → return 1.
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
          boardLengthValue
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

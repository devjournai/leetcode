/**
 * Find Winner On A Tic Tac Toe Game
 * Intuition: Track row/col/diagonal scores as +1 for A and -1 for B. A line of 3 or -3 wins immediately; 9 moves without a winner is a draw, else pending.
 * Approach: 1. For each move add playerIndicatorValue to its row, column, and diagonals if applicable. 2. If any line hits 3 return "A", -3 return "B". 3. After all moves return "Draw" if 9 else "Pending".
 * Dry Run: moves = [[0,0],[2,0],[1,1],[2,1],[2,2]]
 *   A fills main diagonal to 3 after the fifth move. Return "A".
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var tictactoe = function (moves) {
  const boardRowScores = new Array(3).fill(0);
  const boardColumnScores = new Array(3).fill(0);
  let primaryDiagonalScore = 0;
  let secondaryDiagonalScore = 0;

  for (
    let moveIndexTracker = 0;
    moveIndexTracker < moves.length;
    moveIndexTracker++
  ) {
    const playerIndicatorValue = moveIndexTracker % 2 === 0 ? 1 : -1;
    const currentMoveCoordinates = moves[moveIndexTracker];
    const coordinateRow = currentMoveCoordinates[0];
    const coordinateColumn = currentMoveCoordinates[1];

    boardRowScores[coordinateRow] += playerIndicatorValue;
    boardColumnScores[coordinateColumn] += playerIndicatorValue;

    if (coordinateRow === coordinateColumn) {
      primaryDiagonalScore += playerIndicatorValue;
    }

    if (coordinateRow + coordinateColumn === 2) {
      secondaryDiagonalScore += playerIndicatorValue;
    }

    if (
      boardRowScores[coordinateRow] === 3 ||
      boardColumnScores[coordinateColumn] === 3 ||
      primaryDiagonalScore === 3 ||
      secondaryDiagonalScore === 3
    ) {
      return "A";
    }

    if (
      boardRowScores[coordinateRow] === -3 ||
      boardColumnScores[coordinateColumn] === -3 ||
      primaryDiagonalScore === -3 ||
      secondaryDiagonalScore === -3
    ) {
      return "B";
    }
  }

  if (moves.length === 9) {
    return "Draw";
  } else {
    return "Pending";
  }
};

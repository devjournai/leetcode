/**
 * Find Winner On A Tic Tac Toe Game
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

/**
 * Design Tic Tac Toe
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var TicTacToe = function (nBoardSize) {
  this.gameBoardSize = nBoardSize;
  this.rowTotalScores = new Array(nBoardSize).fill(0);
  this.columnTotalScores = new Array(nBoardSize).fill(0);
  this.leadingDiagonalTotal = 0;
  this.secondaryDiagonalTotal = 0;
};

TicTacToe.prototype.move = function (
  rowCoordinate,
  colCoordinate,
  playerNumber,
) {
  const scoreChangeValue = playerNumber === 1 ? 1 : -1;
  const currentBoardSize = this.gameBoardSize;

  this.rowTotalScores[rowCoordinate] += scoreChangeValue;
  this.columnTotalScores[colCoordinate] += scoreChangeValue;

  if (rowCoordinate === colCoordinate) {
    this.leadingDiagonalTotal += scoreChangeValue;
  }

  if (rowCoordinate + colCoordinate === currentBoardSize - 1) {
    this.secondaryDiagonalTotal += scoreChangeValue;
  }

  const currentAbsoluteRowScore = Math.abs(this.rowTotalScores[rowCoordinate]);
  const currentAbsoluteColumnScore = Math.abs(
    this.columnTotalScores[colCoordinate],
  );
  const currentAbsoluteLeadingDiagonalScore = Math.abs(
    this.leadingDiagonalTotal,
  );
  const currentAbsoluteSecondaryDiagonalScore = Math.abs(
    this.secondaryDiagonalTotal,
  );

  if (
    currentAbsoluteRowScore === currentBoardSize ||
    currentAbsoluteColumnScore === currentBoardSize ||
    currentAbsoluteLeadingDiagonalScore === currentBoardSize ||
    currentAbsoluteSecondaryDiagonalScore === currentBoardSize
  ) {
    return playerNumber;
  }

  return 0;
};

/**
 * Design Tic Tac Toe
 * Intuition: Player 1 adds +1 and player 2 adds -1 to the moved row, column, and diagonals. A line of n of the same player has absolute score n, so a winner can be detected in O(1) per move.
 * Approach: 1. Store n and zeroed row/column arrays plus two diagonal totals. 2. On move, apply +1 or -1 to that row and column; if row === col update the main diagonal; if row + col === n - 1 update the anti-diagonal. 3. If any of those four absolute scores equals n, return playerNumber. 4. Otherwise return 0.
 * Dry Run: n = 2; move(0, 0, 1), move(0, 1, 2), move(1, 1, 1).
 *   - Third move completes the main diagonal for player 1 (abs score 2) → return 1.
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
  playerNumber
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
    this.columnTotalScores[colCoordinate]
  );
  const currentAbsoluteLeadingDiagonalScore = Math.abs(
    this.leadingDiagonalTotal
  );
  const currentAbsoluteSecondaryDiagonalScore = Math.abs(
    this.secondaryDiagonalTotal
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

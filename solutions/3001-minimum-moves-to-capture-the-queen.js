/**
 * Minimum Moves To Capture The Queen
 * Intuition: A rook captures in one move on the same row or column unless the bishop sits strictly between them. A bishop captures in one move on the same diagonal unless the rook sits strictly between them. Otherwise the rook can always reach the queen in two moves.
 * Approach: 1. If the rook shares the queen's row, return 2 when the bishop blocks that row segment and 1 otherwise. 2. If they share a column, apply the same blocking check. 3. If the bishop shares a diagonal with the queen, return 2 when the rook blocks that diagonal and 1 otherwise. 4. In every remaining case return 2.
 * Dry Run: a=1, b=1, c=8, d=8, e=2, f=3
 *   1. Rook at (1,1), bishop at (8,8), queen at (2,3).
 *   2. Rook is not on the queen's row or column.
 *   3. Bishop is not on either diagonal through the queen.
 *   4. Return 2.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minMovesToCaptureTheQueen = function (a, b, c, d, e, f) {
  const rookRow = a;
  const rookCol = b;
  const bishopRow = c;
  const bishopCol = d;
  const queenRow = e;
  const queenCol = f;

  if (rookRow === queenRow) {
    const bishopBlocksRow =
      bishopRow === rookRow &&
      ((rookCol < bishopCol && bishopCol < queenCol) ||
        (rookCol > bishopCol && bishopCol > queenCol));
    return bishopBlocksRow ? 2 : 1;
  }

  if (rookCol === queenCol) {
    const bishopBlocksCol =
      bishopCol === queenCol &&
      ((rookRow < bishopRow && bishopRow < queenRow) ||
        (rookRow > bishopRow && bishopRow > queenRow));
    return bishopBlocksCol ? 2 : 1;
  }

  if (bishopRow + bishopCol === queenRow + queenCol) {
    const rookBlocksDiagonal =
      rookRow + rookCol === bishopRow + bishopCol &&
      ((bishopRow < rookRow && rookRow < queenRow) ||
        (bishopRow > rookRow && rookRow > queenRow));
    return rookBlocksDiagonal ? 2 : 1;
  }

  if (bishopRow - bishopCol === queenRow - queenCol) {
    const rookBlocksDiagonal =
      rookRow - rookCol === bishopRow - bishopCol &&
      ((bishopRow < rookRow && rookRow < queenRow) ||
        (bishopRow > rookRow && rookRow > queenRow));
    return rookBlocksDiagonal ? 2 : 1;
  }

  return 2;
};

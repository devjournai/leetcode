/**
 * Furthest Point From Origin
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var furthestDistanceFromOrigin = function (moves) {
  let totalLeftMoves = 0;
  let totalRightMoves = 0;
  let undecidedMoves = 0;

  for (let moveIndex = 0; moveIndex < moves.length; moveIndex++) {
    let characterAtMove = moves[moveIndex];
    switch (characterAtMove) {
      case "L":
        totalLeftMoves++;
        break;
      case "R":
        totalRightMoves++;
        break;
      case "_":
        undecidedMoves++;
        break;
    }
  }

  let absoluteDifference = Math.abs(totalLeftMoves - totalRightMoves);
  let finalDistance = absoluteDifference + undecidedMoves;

  return finalDistance;
};

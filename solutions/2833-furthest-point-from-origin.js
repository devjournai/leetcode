/**
 * Furthest Point From Origin
 *
 * Intuition:
 * We start at position 0 and process each move.
 *
 * • 'L' moves one step to the left.
 * • 'R' moves one step to the right.
 * • '_' can be chosen as either 'L' or 'R'.
 *
 * To maximize the final distance from the origin, every undecided move ('_')
 * should be assigned in the direction that increases the current imbalance
 * between left and right moves.
 *
 * Let:
 *
 *      left  = number of 'L'
 *      right = number of 'R'
 *      blank = number of '_'
 *
 * The fixed moves already create a distance of:
 *
 *      |left - right|
 *
 * Every blank move can increase this distance by exactly 1 if we choose its
 * direction optimally.
 *
 * Therefore, the maximum possible distance is:
 *
 *      |left - right| + blank
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Count:
 *
 *      • Total left moves.
 *      • Total right moves.
 *      • Total undecided moves.
 *
 * 2. Compute the absolute difference between left and right moves.
 *
 * 3. Add all undecided moves to this difference.
 *
 * 4. Return the result.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * moves = "L_RL__"
 *
 * Count:
 *
 *      left  = 2
 *      right = 1
 *      blank = 3
 *
 * Fixed distance:
 *
 *      |2 - 1| = 1
 *
 * Assign every '_' as 'L':
 *
 *      Distance = 1 + 3 = 4
 *
 * Answer:
 *
 *      4
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
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

/**
 * Robot Return To Origin
 * Intuition: R/L and U/D cancel. The robot is back iff both net deltas are zero.
 * Approach: 1. Track `horizontalCoordinate` and `verticalCoordinate`. 2. R++, L--, U++, D--. 3. Return both === 0.
 * Dry Run: moves = "UD".
 *   - U → v=1. D → v=0. h=0,v=0 → true.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var judgeCircle = function (moves) {
  let horizontalCoordinate = 0;
  let verticalCoordinate = 0;

  for (let moveCounter = 0; moveCounter < moves.length; moveCounter++) {
    let currentMoveCharacter = moves[moveCounter];

    if (currentMoveCharacter === "R") {
      horizontalCoordinate++;
    } else if (currentMoveCharacter === "L") {
      horizontalCoordinate--;
    } else if (currentMoveCharacter === "U") {
      verticalCoordinate++;
    } else if (currentMoveCharacter === "D") {
      verticalCoordinate--;
    }
  }

  return horizontalCoordinate === 0 && verticalCoordinate === 0;
};

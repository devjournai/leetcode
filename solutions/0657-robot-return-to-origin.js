/**
 * Robot Return To Origin
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

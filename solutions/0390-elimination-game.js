/**
 * Elimination Game
 * Time Complexity: O(log N)
 * Space Complexity: O(1)
*/
var lastRemaining = function (n) {
  let currentFinal = 1;
  let currentElements = n;
  let currentJump = 1;
  let isMovingLeft = true;

  while (currentElements > 1) {
    if (isMovingLeft || currentElements % 2 === 1) {
      currentFinal += currentJump;
    }

    currentElements = Math.floor(currentElements / 2);
    isMovingLeft = !isMovingLeft;
    currentJump *= 2;
  }

  return currentFinal;
};
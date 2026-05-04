/**
 * Egg Drop With 2 Eggs And N Floors
 * Time Complexity: O(sqrt(N))
 * Space Complexity: O(1)
 */
var twoEggDrop = function (n) {
  let currentMoves = 0;
  let accumulatedFloors = 0;

  while (accumulatedFloors < n) {
    currentMoves++;
    accumulatedFloors += currentMoves;
  }

  return currentMoves;
};

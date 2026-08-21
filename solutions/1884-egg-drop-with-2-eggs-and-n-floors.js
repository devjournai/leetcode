/**
 * Egg Drop With 2 Eggs And N Floors
 * Intuition: With two eggs, optimal first-egg gaps decrease by 1 each drop (triangular numbers) so worst-case drops T satisfy T(T+1)/2 ≥ n.
 * Approach: 1. Grow `currentMoves` while `accumulatedFloors` += currentMoves until ≥ n. 2. Return currentMoves.
 * Dry Run: n=2. Moves 1 cover 1 floor, moves 2 cover 3≥2. Return 2.
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

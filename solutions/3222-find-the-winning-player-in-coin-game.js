/**
 * Find the Winning Player in Coin Game
 * Intuition: Each turn spends 1 coin of value 75 (x) and 4 coins of value 10 (y). The number of moves is min(x, floor(y/4)). Alice wins on odd move counts.
 * Approach: 1. Compute possibleMoves = min(x, floor(y / 4)). 2. If possibleMoves is even Bob wins, else Alice.
 * Dry Run:
 *   x = 2, y = 7 -> min(2, 1) = 1 odd -> Alice.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var losingPlayer = function (x, y) {
  const possibleMoves = Math.min(x, Math.floor(y / 4));
  return possibleMoves % 2 === 0 ? "Bob" : "Alice";
};

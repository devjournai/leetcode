/**
 * Divisor Game
 * Intuition: Alice wins iff n is even: from even she can always leave odd, and from odd Bob is forced to leave even, until n=1 loses for the player to move.
 * Approach: 1. Return n % 2 === 0.
 * Dry Run: n = 2.
 *   - Even, Alice subtracts 1 leaving 1. Bob cannot move. true.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var divisorGame = function (n) {
  let aliceWinsIfEven = n % 2 === 0;
  return aliceWinsIfEven;
};

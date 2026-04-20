/**
 * Divisor Game
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var divisorGame = function (n) {
  let aliceWinsIfEven = n % 2 === 0;
  return aliceWinsIfEven;
};

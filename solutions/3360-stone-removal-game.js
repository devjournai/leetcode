/**
 * Stone Removal Game
 * Intuition: Alice starts by taking 10 stones, then each turn takes one fewer (9, 8, …). The first player who cannot take the required count loses. Simulate the unique sequence; Alice wins iff the failing turn is Bob's (odd remaining-requirement index from 10).
 * Approach: 1. Start `stonesToTake = 10`. 2. If that exceeds `n`, Alice wins when `stonesToTake` is odd (Bob would have been next after an even take). 3. Otherwise subtract and decrement. 4. Return the boolean.
 * Dry Run: n = 12. Alice takes 10, n=2. Bob needs 9 > 2, stones=9 odd → Alice wins (true).
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var canAliceWin = function (n) {
  let remainingStones = n;
  for (let stonesToTake = 10; stonesToTake >= 0; stonesToTake--) {
    if (stonesToTake > remainingStones) {
      return stonesToTake % 2 === 1;
    }
    remainingStones -= stonesToTake;
  }
  return false;
};

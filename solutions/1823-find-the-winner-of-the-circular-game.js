/**
 * Find The Winner Of The Circular Game
 * Intuition: Josephus recurrence: with i people the winner index is (winner(i-1) + k) mod i, 0-based, then convert to 1-based.
 * Approach: 1. `finalWinnerIndex = 0`. 2. For currentCount from 1 to n, set index = (index + k) % currentCount. 3. Return index + 1.
 * Dry Run: n = 5, k = 2.
 *   - Indices evolve 0,0,1,1,3 → winner 4.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var findTheWinner = function (n, k) {
  let finalWinnerIndex = 0;

  for (let currentCount = 1; currentCount <= n; currentCount++) {
    finalWinnerIndex = (finalWinnerIndex + k) % currentCount;
  }

  return finalWinnerIndex + 1;
};

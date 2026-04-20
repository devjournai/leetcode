/**
 * Find The Winner Of The Circular Game
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

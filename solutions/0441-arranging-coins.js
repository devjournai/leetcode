/**
 * Arranging Coins
 * Intuition: k complete rows need `k(k+1)/2` coins. Binary search the largest k whose triangular number is ≤ n.
 * Approach: 1. Bounds 1..n. 2. Mid `currentGuess`; `neededCoins = guess*(guess+1)/2`. 3. Equal → return guess. 4. Too small → record `maxCompleteRows` and search higher. 5. Too large → search lower. Return `maxCompleteRows`.
 * Dry Run: n=8. Guess 4 needs 10>8 → high=3. Guess 2 needs 3<8 → max=2, low=3. Guess 3 needs 6<8 → max=3. Return 3.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var arrangeCoins = function (n) {
  let lowerBound = 1;
  let upperBound = n;
  let maxCompleteRows = 0;

  while (lowerBound <= upperBound) {
    let currentGuess = Math.floor(lowerBound + (upperBound - lowerBound) / 2);
    let neededCoins = (currentGuess * (currentGuess + 1)) / 2;

    if (neededCoins === n) {
      return currentGuess;
    } else if (neededCoins < n) {
      maxCompleteRows = currentGuess;
      lowerBound = currentGuess + 1;
    } else {
      upperBound = currentGuess - 1;
    }
  }
  return maxCompleteRows;
};

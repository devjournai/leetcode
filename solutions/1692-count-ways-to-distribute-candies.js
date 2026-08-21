/**
 * Count Ways To Distribute Candies
 * Intuition: The nth candy either opens a new bag (`dp[n-1][k-1]`) or goes into one of `k` existing bags (`k * dp[n-1][k]`). Bags are indistinguishable in the first case and labeled in the second per the recurrence used here.
 * Approach: 1. `dpTable[c][1] = 1`. 2. For `candiesIter` and `bagsIter`, set `optionOne + optionTwo` mod `1e9+7`. 3. Return `dpTable[n][k]`.
 * Dry Run: n = 3, k = 2
 * dp[1][1]=1; dp[2][1]=1, dp[2][2]=1; dp[3][2] = dp[2][1] + 2*dp[2][2] = 1+2 = 3.
 * Time Complexity: O(n * k)
 * Space Complexity: O(n * k)
 */
var waysToDistribute = function (n, k) {
  const modulusValue = 1e9 + 7;
  const dpTable = new Array(n + 1).fill(0).map(() => new Array(k + 1).fill(0));

  for (let currentCandyCount = 1; currentCandyCount <= n; currentCandyCount++) {
    dpTable[currentCandyCount][1] = 1;
  }

  for (let candiesIter = 2; candiesIter <= n; candiesIter++) {
    for (let bagsIter = 2; bagsIter <= Math.min(candiesIter, k); bagsIter++) {
      let optionOne = dpTable[candiesIter - 1][bagsIter - 1];
      let optionTwo =
        (bagsIter * dpTable[candiesIter - 1][bagsIter]) % modulusValue;
      dpTable[candiesIter][bagsIter] = (optionOne + optionTwo) % modulusValue;
    }
  }

  return dpTable[n][k];
};

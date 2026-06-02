/**
 * Number Of Ways To Build House Of Cards
 * Intuition: The problem can be modeled as finding the number of ways to partition an integer `n` into parts. Each part represents the number of cards in a single row of the house. The rules for a single row state that `k` triangles require `3k-1` cards. Thus, the allowed parts are `2, 5, 8, ...` (i.e., numbers of the form `3k-1` for `k >= 1`). The structural constraints on higher rows (`k_i <= k_{i-1}-1`) are implicitly handled by the problem's definition of distinct houses or are not considered as a hard filtering constraint in the intended solution, reducing the problem to a standard coin change (unbounded knapsack) variation where the order of parts does not matter.
 * Approach: 1. Initialize a dynamic programming array `dp` of size `n+1` to store the number of ways to form each sum up to `n`. Set `dp[0]` to 1 (one way to form a sum of 0, by choosing no cards) and all other elements to 0. 2. Iterate through possible 'card amounts' for a single row, starting from 2 (for 1 triangle) and incrementing by 3 (to get 5 for 2 triangles, 8 for 3 triangles, etc.). Let's call this `cardValue`. 3. For each `cardValue`, iterate backwards from `n` down to `cardValue` using a variable `currentTotal`. 4. For each `currentTotal`, update `dp[currentTotal]` by adding `dp[currentTotal - cardValue]`. This accumulates the count of ways to form `currentTotal` by including the `cardValue` as one of its parts. 5. After iterating through all relevant `cardValue`s, `dp[n]` will contain the total number of distinct ways to build a house of cards using `n` cards.
 * Dry Run: n = 7
 * dp = [1, 0, 0, 0, 0, 0, 0, 0] (initialized dp array for n+1 elements)
 *
 * cardValue = 2 (for k=1 triangle, 3*1-1=2 cards)
 *   currentTotal = 7: dp[7] += dp[5] (0+0=0)
 *   currentTotal = 6: dp[6] += dp[4] (0+0=0)
 *   currentTotal = 5: dp[5] += dp[3] (0+0=0)
 *   currentTotal = 4: dp[4] += dp[2] (0+0=0)
 *   currentTotal = 3: dp[3] += dp[1] (0+0=0)
 *   currentTotal = 2: dp[2] += dp[0] (0+1=1)
 * dp after cardValue 2: [1, 0, 1, 0, 0, 0, 0, 0]
 *
 * cardValue = 5 (for k=2 triangles, 3*2-1=5 cards)
 *   currentTotal = 7: dp[7] += dp[2] (0+1=1) (This corresponds to sum 7 = 5 + 2)
 *   currentTotal = 6: dp[6] += dp[1] (0+0=0)
 *   currentTotal = 5: dp[5] += dp[0] (0+1=1) (This corresponds to sum 5 = 5)
 * dp after cardValue 5: [1, 0, 1, 0, 0, 1, 0, 1]
 *
 * cardValue = 8 (for k=3 triangles, 3*3-1=8 cards)
 *   8 > n (7), so loop for cardValue terminates.
 *
 * Final Result: dp[7] = 1.
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 */
var houseOfCards = function (n) {
  const waysToBuild = new Array(n + 1).fill(0);
  waysToBuild[0] = 1;

  for (let cardCost = 2; cardCost <= n; cardCost += 3) {
    for (let currentSum = n; currentSum >= cardCost; currentSum--) {
      waysToBuild[currentSum] += waysToBuild[currentSum - cardCost];
    }
  }

  return waysToBuild[n];
};

/**
 * Maximize the Profit as the Salesman
 *
 * Intuition:
 * Each offer represents an interval:
 *
 *      [start, end]
 *
 * with a profit (gold).
 *
 * Since a house cannot be sold twice, two selected offers must not overlap.
 *
 * This is a classic Weighted Interval Scheduling problem.
 *
 * We process houses from left to right using Dynamic Programming.
 *
 * Let:
 *
 *      dp[i]
 *
 * denote the maximum gold that can be earned considering only houses
 * from index i to n - 1.
 *
 * At each house i, we have two choices:
 *
 * 1. Skip house i.
 *
 *      Profit = dp[i + 1]
 *
 * 2. Accept an offer starting at i.
 *
 *      Profit =
 *          offer.gold + dp[offer.end + 1]
 *
 * We take the maximum of all possibilities.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Group offers by their starting house.
 *
 *      startOffers[start] = list of offers
 *
 * 2. Create DP array:
 *
 *      dp[n] = 0
 *
 * 3. Traverse houses from right to left.
 *
 * 4. Initially:
 *
 *      dp[i] = dp[i + 1]
 *
 *      (Skip this house.)
 *
 * 5. For every offer beginning at i:
 *
 *      dp[i] = max(
 *          dp[i],
 *          gold + dp[end + 1]
 *      )
 *
 * 6. Return:
 *
 *      dp[0]
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 5
 *
 * offers =
 * [
 *   [0,0,1],
 *   [0,2,2],
 *   [1,3,2]
 * ]
 *
 * Group by start:
 *
 * 0 → (0,1), (2,2)
 * 1 → (3,2)
 *
 * DP:
 *
 * dp[5] = 0
 *
 * i = 4
 *
 * dp[4] = 0
 *
 * i = 3
 *
 * dp[3] = 0
 *
 * i = 2
 *
 * dp[2] = 0
 *
 * i = 1
 *
 * max(
 *      dp[2],
 *      2 + dp[4]
 * )
 * = 2
 *
 * i = 0
 *
 * max(
 *      dp[1] = 2,
 *      1 + dp[1] = 3,
 *      2 + dp[3] = 2
 * )
 *
 * Answer = 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */

var maximizeTheProfit = function (n, offers) {
  const startOffers = Array.from({ length: n }, () => []);

  for (const [start, end, gold] of offers) {
    startOffers[start].push([end, gold]);
  }

  const dp = new Array(n + 1).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    dp[i] = dp[i + 1];
    for (const [end, gold] of startOffers[i]) {
      dp[i] = Math.max(dp[i], gold + dp[end + 1]);
    }
  }

  return dp[0];
};

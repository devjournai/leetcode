/**
 * Minimum Number of Coins for Fruits
 *
 * Intuition:
 *
 * Suppose we BUY fruit i.
 *
 * The problem says that after buying fruit i, we can get the
 * next i fruits for free.
 *
 * Since the array is 0-indexed:
 *
 *     fruit i
 *
 * can cover fruits:
 *
 *     i + 1, i + 2, ..., 2 * i + 1
 *
 * So after purchasing fruit i, the next fruit we need to
 * consider paying for can be anywhere from:
 *
 *     i + 1
 * to:
 *     2 * i + 1
 *
 * ------------------------------------------------------------
 *
 * Dynamic Programming:
 *
 * Let:
 *
 *     dp[i] = minimum coins needed to acquire all fruits
 *             starting from fruit i.
 *
 * For fruit i, we have two possibilities:
 *
 * We need to purchase it eventually, because if it is free from
 * a previous purchase, we can still choose to purchase it in
 * order to receive its reward.
 *
 * If we purchase fruit i:
 *
 *     cost = prices[i]
 *
 * After that, fruits from:
 *
 *     i + 1 ... 2 * i + 1
 *
 * can be taken for free.
 *
 * Therefore, the next fruit we actually need to purchase can be
 * any index:
 *
 *     j ∈ [i + 1, 2 * i + 1]
 *
 * So:
 *
 *     dp[i] = prices[i] + min(dp[j])
 *
 * where:
 *
 *     i + 1 <= j <= 2 * i + 1
 *
 * ------------------------------------------------------------
 *
 * But there is one important detail:
 *
 * If 2 * i + 1 >= n, then purchasing fruit i can cover all
 * remaining fruits.
 *
 * Therefore:
 *
 *     dp[i] = prices[i]
 *
 * ------------------------------------------------------------
 *
 * Base Case:
 *
 * For the last fruit:
 *
 *     dp[n - 1] = prices[n - 1]
 *
 * because we can simply buy it.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 * prices = [3, 1, 2]
 *
 * n = 3
 *
 * Start from the end.
 *
 * i = 2:
 *
 *     Buy fruit 3
 *     cost = 2
 *
 *     dp[2] = 2
 *
 * i = 1:
 *
 *     Buy fruit 2 for 1.
 *
 *     It can give fruit 3 for free.
 *
 *     dp[1] = 1
 *
 * i = 0:
 *
 *     Buy fruit 1 for 3.
 *
 *     Fruit 2 can be free.
 *
 *     Next fruit we need to purchase can be fruit 2.
 *
 *     dp[0] = 3 + dp[1]
 *           = 4
 *
 * Answer:
 *
 *     4
 *
 * ------------------------------------------------------------
 *
 * Example 2:
 *
 * prices = [1,10,1,1]
 *
 * We can:
 *
 *     Buy fruit 1 → 1
 *     Fruit 2 → free
 *
 *     Buy fruit 3 → 1
 *     Fruit 4 → free
 *
 * Total:
 *
 *     1 + 1 = 2
 *
 * ------------------------------------------------------------
 * Time Complexity: O(n²)
 * Space Complexity: O(n)
 */

var minimumCoins = function (prices) {
  const n = prices.length;
  const dp = new Array(n).fill(0);

  for (let i = n - 1; i >= 0; i--) {
    if (2 * i + 2 >= n) {
      dp[i] = prices[i];
      continue;
    }

    let minNext = Infinity;
    for (let j = i + 1; j <= 2 * i + 2 && j < n; j++) {
      minNext = Math.min(minNext, dp[j]);
    }

    dp[i] = prices[i] + minNext;
  }

  return dp[0];
};

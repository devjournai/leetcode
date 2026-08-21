/**
 * Best Time To Buy And Sell Stock With Transaction Fee
 * Intuition: Track the best cash if we hold a share vs if we do not. Selling pays `price - fee`; buying spends the current price. Save yesterday’s cash-without-stock before updating so a same-day buy/sell cannot reuse the new sell.
 * Approach: 1. If length ≤ 1, return 0. 2. `maxProfitWithoutStock = 0`, `maxProfitWithStock = -prices[0]`. 3. For each later price, snapshot `previousMaxProfitWithoutStock`, then sell into cash or buy from that snapshot. 4. Return `maxProfitWithoutStock`.
 * Dry Run: prices = [1,3,2,8], fee = 2. Buy at 1, sell at 8 → profit 5 (8-1-2). Holding cash 5 is best.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxProfit = function (prices, fee) {
  if (prices.length <= 1) {
    return 0;
  }

  let maxProfitWithoutStock = 0;
  let maxProfitWithStock = -prices[0];

  for (let iteratorIndex = 1; iteratorIndex < prices.length; iteratorIndex++) {
    let previousMaxProfitWithoutStock = maxProfitWithoutStock;

    maxProfitWithoutStock = Math.max(
      maxProfitWithoutStock,
      maxProfitWithStock + prices[iteratorIndex] - fee
    );

    maxProfitWithStock = Math.max(
      maxProfitWithStock,
      previousMaxProfitWithoutStock - prices[iteratorIndex]
    );
  }

  return maxProfitWithoutStock;
};

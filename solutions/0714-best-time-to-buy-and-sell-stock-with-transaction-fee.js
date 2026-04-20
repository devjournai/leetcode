/**
 * Best Time To Buy And Sell Stock With Transaction Fee
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
      maxProfitWithStock + prices[iteratorIndex] - fee,
    );

    maxProfitWithStock = Math.max(
      maxProfitWithStock,
      previousMaxProfitWithoutStock - prices[iteratorIndex],
    );
  }

  return maxProfitWithoutStock;
};

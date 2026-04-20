/**
 * Best Time To Buy And Sell Stock III
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxProfit = function (prices) {
  if (!prices || prices.length === 0) {
    return 0;
  }

  let costForFirstBuy = Number.POSITIVE_INFINITY;
  let profitAfterFirstSale = 0;
  let costForSecondBuy = Number.POSITIVE_INFINITY;
  let profitAfterSecondSale = 0;

  for (let currentPrice of prices) {
    costForFirstBuy = Math.min(costForFirstBuy, currentPrice);
    profitAfterFirstSale = Math.max(
      profitAfterFirstSale,
      currentPrice - costForFirstBuy,
    );

    costForSecondBuy = Math.min(
      costForSecondBuy,
      currentPrice - profitAfterFirstSale,
    );
    profitAfterSecondSale = Math.max(
      profitAfterSecondSale,
      currentPrice - costForSecondBuy,
    );
  }

  return profitAfterSecondSale;
};

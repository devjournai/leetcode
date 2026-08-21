/**
 * Best Time To Buy And Sell Stock III
 * Intuition: At most two transactions. Four running values track cheapest first buy, best first-sale profit, effective cost of a second buy (price minus first profit), and best profit after a second sale.
 * Approach: 1. Empty prices → 0. 2. For each price: firstBuy = min(firstBuy, price); firstProfit = max(firstProfit, price - firstBuy); secondBuy = min(secondBuy, price - firstProfit); secondProfit = max(secondProfit, price - secondBuy). Return secondProfit (covers 0, 1, or 2 sales).
 * Dry Run: [3,3,5,0,0,3,1,4]. First profit grows to 2 (3→5). After 0, second buy effective cost is -2. Second sale at 4 yields 6.
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
      currentPrice - costForFirstBuy
    );

    costForSecondBuy = Math.min(
      costForSecondBuy,
      currentPrice - profitAfterFirstSale
    );
    profitAfterSecondSale = Math.max(
      profitAfterSecondSale,
      currentPrice - costForSecondBuy
    );
  }

  return profitAfterSecondSale;
};

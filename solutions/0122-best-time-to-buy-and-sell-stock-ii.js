/**
 * Best Time To Buy And Sell Stock II
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxProfit = function (prices) {
  let totalProfit = 0;
  const priceLength = prices.length;

  for (
    let currentDayIndex = 1;
    currentDayIndex < priceLength;
    currentDayIndex++
  ) {
    const previousDayPrice = prices[currentDayIndex - 1];
    const currentDayPrice = prices[currentDayIndex];

    if (currentDayPrice > previousDayPrice) {
      const profitFromTrade = currentDayPrice - previousDayPrice;
      totalProfit += profitFromTrade;
    }
  }

  return totalProfit;
};

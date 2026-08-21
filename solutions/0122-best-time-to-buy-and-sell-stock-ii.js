/**
 * Best Time To Buy And Sell Stock II
 * Intuition: Unlimited transactions mean every uphill adjacent pair can be taken; the total profit is the sum of all positive day-to-day increases.
 * Approach: 1. totalProfit = 0. 2. For each day i from 1, if prices[i] > prices[i-1], add the difference. 3. Return the sum.
 * Dry Run: [7,1,5,3,6,4]. Gains: 4 (1→5) + 3 (3→6) = 7. Down days add nothing.
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

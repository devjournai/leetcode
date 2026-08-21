/**
 * Best Time To Buy And Sell Stock
 * Intuition: One buy then one sell. Track the cheapest day seen so far and the best sell-minus-buy after that day.
 * Approach: 1. Length ≤ 1 returns 0. 2. buyIndex starts at 0. 3. For each later sellIndex, update max profit from prices[sell]-prices[buy]. 4. If today’s price is lower than the buy price, move buyIndex here.
 * Dry Run: [7,1,5,3,6,4]. Buy moves to 1. Profits vs 1: 4, 2, 5, 3. Max is 5 (buy 1, sell 6).
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maxProfit = function (prices) {
  if (prices === null || prices.length <= 1) {
    return 0;
  }

  let buyIndex = 0;
  let overallMaxProfit = 0;

  for (let sellIndex = 1; sellIndex < prices.length; sellIndex++) {
    let currentPotentialProfit = prices[sellIndex] - prices[buyIndex];

    if (currentPotentialProfit > overallMaxProfit) {
      overallMaxProfit = currentPotentialProfit;
    }

    if (prices[sellIndex] < prices[buyIndex]) {
      buyIndex = sellIndex;
    }
  }

  return overallMaxProfit;
};

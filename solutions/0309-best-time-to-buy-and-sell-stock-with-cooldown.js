/**
 * Best Time To Buy And Sell Stock With Cooldown
 * Intuition: Each day the best profit is one of hold, rest, or sold. Sold today uses yesterday’s hold; a new hold may buy only from rest (cooldown). O(1) rolling variables suffice.
 * Approach: 1. Length < 2 → 0. 2. Start hold=-Infinity, rest=0, sold=0. 3. For each price: save prevHold; hold=max(hold, rest-price); rest=max(rest, sold); sold=prevHold+price. 4. Return max(sold, rest).
 * Dry Run: prices=[1,2,3,0,2].
 *   - After the last day sold=3, rest=2.
 *   - Return 3 (buy 1, sell 2, cooldown, buy 0, sell 2).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var maxProfit = function (prices) {
  if (prices === null || prices.length < 2) {
    return 0;
  }

  let profitSoldOnPreviousDay = 0;
  let profitRestOnPreviousDay = 0;
  let profitHoldOnPreviousDay = -Infinity;

  for (let dayIndex = 0; dayIndex < prices.length; dayIndex++) {
    let currentStockPrice = prices[dayIndex];

    let temporaryHoldProfit = profitHoldOnPreviousDay;

    profitHoldOnPreviousDay = Math.max(
      profitHoldOnPreviousDay,
      profitRestOnPreviousDay - currentStockPrice
    );
    profitRestOnPreviousDay = Math.max(
      profitRestOnPreviousDay,
      profitSoldOnPreviousDay
    );
    profitSoldOnPreviousDay = temporaryHoldProfit + currentStockPrice;
  }

  return Math.max(profitSoldOnPreviousDay, profitRestOnPreviousDay);
};

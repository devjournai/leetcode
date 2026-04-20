/**
 * Best Time To Buy And Sell Stock With Cooldown
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

        profitHoldOnPreviousDay = Math.max(profitHoldOnPreviousDay, profitRestOnPreviousDay - currentStockPrice);
        profitRestOnPreviousDay = Math.max(profitRestOnPreviousDay, profitSoldOnPreviousDay);
        profitSoldOnPreviousDay = temporaryHoldProfit + currentStockPrice;
    }

    return Math.max(profitSoldOnPreviousDay, profitRestOnPreviousDay);
};
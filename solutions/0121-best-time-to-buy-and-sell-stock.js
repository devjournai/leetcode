/**
 * Best Time To Buy And Sell Stock
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
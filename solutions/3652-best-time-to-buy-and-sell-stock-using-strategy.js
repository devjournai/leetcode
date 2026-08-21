/**
 * Best Time To Buy And Sell Stock Using Strategy
 * Intuition: Profit is strategy[i] * prices[i]. One optional window of even length k becomes hold for the first half and sell for the second, so only the second half of that window still contributes prices.
 * Approach: 1. Build prefixProfit (original strategy * price) and prefixPrice. 2. Start from the unmodified total prefixProfit[n]. 3. For every window ending at i (length k), replace that window’s original profit with the second-half price sum: candidate = total - (prefixProfit[i] - prefixProfit[i - k]) + (prefixPrice[i] - prefixPrice[i - k / 2]). 4. Take the max over doing nothing and every window.
 * Dry Run: prices = [4, 2, 8], strategy = [-1, 0, 1], k = 2. Original profit = -4 + 0 + 8 = 4. Window [0, 1] becomes [0, 1]: profit = 0 + 2 + 8 = 10. Window [1, 2] stays 4. Answer 10.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maxProfit = function (prices, strategy, k) {
  const n = prices.length;
  const prefixProfit = new Array(n + 1).fill(0);
  const prefixPrice = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    prefixProfit[i] = prefixProfit[i - 1] + prices[i - 1] * strategy[i - 1];
    prefixPrice[i] = prefixPrice[i - 1] + prices[i - 1];
  }

  let bestProfit = prefixProfit[n];
  const half = Math.floor(k / 2);

  for (let endIndex = k; endIndex <= n; endIndex++) {
    const withoutWindow =
      prefixProfit[n] - (prefixProfit[endIndex] - prefixProfit[endIndex - k]);
    const secondHalfPrices =
      prefixPrice[endIndex] - prefixPrice[endIndex - half];
    bestProfit = Math.max(bestProfit, withoutWindow + secondHalfPrices);
  }

  return bestProfit;
};

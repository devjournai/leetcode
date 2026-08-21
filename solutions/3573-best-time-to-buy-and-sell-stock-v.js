/**
 * Best Time to Buy and Sell Stock V
 * Intuition: Each of up to k transactions is either a long (buy then sell) or a short (sell then buy). DP tracks cash, a long position, or a short position after i days and j completed/open transactions.
 * Approach: 1. f[i][j][0/1/2] = max profit on day i using at most j transactions: flat / holding long / holding short. 2. Transitions: close a long or short into flat; open a long or short from the previous transaction's flat. 3. Answer f[n-1][k][0].
 * Dry Run: prices = [1, 7, 2, 8], k = 2. One long 1→7 (+6) and another 2→8 (+6) → 12, or mix with shorts; DP takes the best.
 * Time Complexity: O(N * K)
 * Space Complexity: O(N * K)
 */
var maximumProfit = function (prices, k) {
  const n = prices.length;
  const f = Array.from({ length: n }, () =>
    Array.from({ length: k + 1 }, () => Array(3).fill(0))
  );

  for (let j = 1; j <= k; j++) {
    f[0][j][1] = -prices[0];
    f[0][j][2] = prices[0];
  }

  for (let i = 1; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      f[i][j][0] = Math.max(
        f[i - 1][j][0],
        f[i - 1][j][1] + prices[i],
        f[i - 1][j][2] - prices[i]
      );
      f[i][j][1] = Math.max(f[i - 1][j][1], f[i - 1][j - 1][0] - prices[i]);
      f[i][j][2] = Math.max(f[i - 1][j][2], f[i - 1][j - 1][0] + prices[i]);
    }
  }

  return f[n - 1][k][0];
};

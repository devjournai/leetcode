/**
 * Maximum Profit From Trading Stocks
 * Intuition: This problem is a classic variation of the 0/1 Knapsack problem. We aim to select a subset of stocks, each with a specific cost and profit, such that their total cost does not exceed a given budget, and their total profit is maximized. Stocks with non-positive profit are irrelevant since they do not contribute to a higher profit.
 * Approach:
 * 1. Transform the input arrays into a list of stock objects. Each object contains its `cost` (from `present[i]`) and `profit` (calculated as `future[i] - present[i]`).
 * 2. Filter this list to include only stocks that yield a positive profit, as buying stocks with zero or negative profit would not contribute to maximizing overall profit.
 * 3. Sort the filtered stocks by profit in descending order. While sorting is not strictly necessary for the correctness of the 0/1 Knapsack algorithm, it's a common practice.
 * 4. Initialize a dynamic programming array, `dpValues`, of size `budget + 1` with all elements set to 0. `dpValues[j]` will store the maximum profit achievable with a budget of `j`.
 * 5. Iterate through each `individualStock` in the processed list of stocks.
 * 6. For each `individualStock`, iterate backwards through possible budget amounts, from `budget` down to `individualStock.cost`. This backward iteration ensures that each stock is considered at most once for inclusion (0/1 Knapsack property).
 * 7. In the inner loop, update `dpValues[availableMoney]` by taking the maximum of its current value and the profit obtained by including the current `individualStock`. The profit from including the current stock is `dpValues[availableMoney - individualStock.cost] + individualStock.profit`.
 * 8. After processing all stocks, the maximum profit achievable within the given budget will be stored in `dpValues[budget]`.
 * Dry Run:
 * Input: present = [5, 10, 15], future = [10, 8, 20], budget = 15
 * 1. Process stocks:
 *    - Stock 0: cost=5, profit=10-5=5
 *    - Stock 1: cost=10, profit=8-10=-2 (filtered out)
 *    - Stock 2: cost=15, profit=20-15=5
 *    Resulting positiveProfitStocks (after filtering and sorting): [{cost: 5, profit: 5}, {cost: 15, profit: 5}]
 * 2. Initialize dpValues = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] (size 16 for budgets 0 to 15)
 * 3. Iterate through positiveProfitStocks:
 *    a. For individualStock = {cost: 5, profit: 5}:
 *       - availableMoney from 15 down to 5:
 *         - availableMoney = 15: dpValues[15] = max(dpValues[15], dpValues[10] + 5) = max(0, 0 + 5) = 5
 *         - ...
 *         - availableMoney = 5: dpValues[5] = max(dpValues[5], dpValues[0] + 5) = max(0, 0 + 5) = 5
 *       dpValues after this stock: [0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5] (from index 5 onwards)
 *    b. For individualStock = {cost: 15, profit: 5}:
 *       - availableMoney from 15 down to 15:
 *         - availableMoney = 15: dpValues[15] = max(dpValues[15], dpValues[0] + 5) = max(5, 0 + 5) = 5
 *       dpValues after this stock: [0,0,0,0,0,5,5,5,5,5,5,5,5,5,5,5]
 * 4. Return dpValues[budget] (dpValues[15]) = 5.
 * Time Complexity: O(N log N + M * B)
 * Space Complexity: O(N + B)
 */
var maximumProfit = function (present, future, budget) {
  const mappedStocks = present.map((stockPresentPrice, currentStockIndex) => ({
    cost: stockPresentPrice,
    profit: future[currentStockIndex] - stockPresentPrice,
  }));

  const filteredStocks = mappedStocks.filter(
    (candidateStock) => candidateStock.profit > 0,
  );

  const sortedStocks = filteredStocks.sort(
    (firstStockCompare, secondStockCompare) =>
      secondStockCompare.profit - firstStockCompare.profit,
  );

  const dpValues = new Array(budget + 1).fill(0);

  for (const individualStock of sortedStocks) {
    for (
      let availableMoney = budget;
      availableMoney >= individualStock.cost;
      availableMoney--
    ) {
      dpValues[availableMoney] = Math.max(
        dpValues[availableMoney],
        dpValues[availableMoney - individualStock.cost] +
          individualStock.profit,
      );
    }
  }

  return dpValues[budget];
};

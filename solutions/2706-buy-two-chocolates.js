/**
 * Buy Two Chocolates
 * Intuition: To minimize the total cost of two chocolates, one must always select the two cheapest items available.
 * Approach: 1. Initialize two variables, `minPriceOne` and `minPriceTwo`, to track the two smallest prices found, setting them initially to a very large number (Infinity). 2. Iterate through each `chocolatePrice` in the given `prices` array. 3. Inside the loop, if `chocolatePrice` is less than `minPriceOne`, update `minPriceTwo` to the current `minPriceOne` value, and then update `minPriceOne` to `chocolatePrice`. 4. Else, if `chocolatePrice` is less than `minPriceTwo` (but not less than `minPriceOne`), update `minPriceTwo` to `chocolatePrice`. 5. After iterating through all prices, calculate `totalPurchaseCost` by summing `minPriceOne` and `minPriceTwo`. 6. If `totalPurchaseCost` is less than or equal to the initial `money`, return the difference (`money - totalPurchaseCost`); otherwise, return the original `money`.
 * Dry Run: prices = [3, 2, 4], money = 5
 *
 * Initialize:
 * minPriceOne = Infinity
 * minPriceTwo = Infinity
 *
 * Loop through prices:
 * 1. currentPrice = 3:
 *    3 < Infinity (true) -> minPriceTwo = Infinity, minPriceOne = 3
 *    (minPriceOne = 3, minPriceTwo = Infinity)
 * 2. currentPrice = 2:
 *    2 < 3 (true) -> minPriceTwo = 3, minPriceOne = 2
 *    (minPriceOne = 2, minPriceTwo = 3)
 * 3. currentPrice = 4:
 *    4 < 2 (false)
 *    Else if 4 < 3 (false)
 *    (minPriceOne = 2, minPriceTwo = 3)
 *
 * Loop ends.
 *
 * Calculate totalPurchaseCost:
 * totalPurchaseCost = minPriceOne + minPriceTwo = 2 + 3 = 5
 *
 * Final check:
 * 5 <= 5 (true)
 * Result = money - totalPurchaseCost = 5 - 5 = 0
 *
 * Return: 0
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var buyChoco = function (prices, money) {
  let minPriceOne = Infinity;
  let minPriceTwo = Infinity;

  for (let currentPrice of prices) {
    if (currentPrice < minPriceOne) {
      minPriceTwo = minPriceOne;
      minPriceOne = currentPrice;
    } else if (currentPrice < minPriceTwo) {
      minPriceTwo = currentPrice;
    }
  }

  let totalPurchaseCost = minPriceOne + minPriceTwo;

  return totalPurchaseCost <= money ? money - totalPurchaseCost : money;
};

/**
 * Minimum Total Price After Applying Discounts
 * Intuition: To minimize the total price, we need to maximize the total amount saved by discounts. Applying a discount d to an item with price p saves p  *  d / 100. By the rearrangement inequality, applying larger discounts to more expensive items maximizes the total savings.
 * Approach: To minimize the total price, we need to maximize the total amount saved by discounts. Applying a discount d to an item with price p saves p  *  d / 100. By the rearrangement inequality, applying larger discounts to more expensive items maximizes the total savings. Therefore, we sort both prices and discounts in ascending order, then use two pointers starting from the ends of both arrays, repeatedly applying the current largest discount to the current most expensive item and accumulating the discounted price. Once all discounts are used up, the remaining items are added at their original prices.
 * Dry Run: Input: prices = [10,30,21], discounts = [50,60]. Output: 32.50000.
 * Time Complexity: O(n * logn+m * logm)
 * Space Complexity: O(logn+logm)
 */
var minPrice = function (prices, discounts) {
  prices.sort((a, b) => a - b);
  discounts.sort((a, b) => a - b);

  let i = prices.length - 1;
  let j = discounts.length - 1;

  let ans = 0;

  while (i >= 0 && j >= 0) {
    ans += (prices[i] * (100 - discounts[j])) / 100;
    i--;
    j--;
  }

  while (i >= 0) {
    ans += prices[i];
    i--;
  }

  return ans;
};

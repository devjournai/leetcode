/**
 * Final Prices With A Special Discount In A Shop
 * Intuition: Discount is the next price <= current (next smaller or equal). A monotonic increasing stack of indices finds that next discount in one pass.
 * Approach: 1. Copy prices into the result. 2. Scan left to right; while the stack top's price >= current, pop and subtract current from that index. 3. Push the current index. 4. Unpopped indices keep full price.
 * Dry Run: prices = [8,4,6,2,3]
 *   - 8 discounted by 4 -> 4
 *   - 4 discounted by 2 -> 2
 *   - 6 discounted by 2 -> 4
 *   - 2 and 3 unchanged. [4,2,4,2,3]
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var finalPrices = function (pricesInput) {
  const totalItems = pricesInput.length;
  const finalPricesResult = [...pricesInput];
  const stackIndices = [];

  for (
    let currentItemIndex = 0;
    currentItemIndex < totalItems;
    currentItemIndex++
  ) {
    const priceNow = pricesInput[currentItemIndex];

    while (
      stackIndices.length > 0 &&
      pricesInput[stackIndices[stackIndices.length - 1]] >= priceNow
    ) {
      const previousItemIndex = stackIndices.pop();
      finalPricesResult[previousItemIndex] =
        pricesInput[previousItemIndex] - priceNow;
    }

    stackIndices.push(currentItemIndex);
  }

  return finalPricesResult;
};

/**
 * Final Prices With A Special Discount In A Shop
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

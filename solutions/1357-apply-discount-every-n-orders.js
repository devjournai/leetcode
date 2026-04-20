/**
 * Apply Discount Every N Orders
 * Time Complexity: O(P)
 * Space Complexity: O(P)
 */
var Cashier = function (
  nthCustomerParam,
  discountParam,
  productsArray,
  pricesArray,
) {
  this.customerVisitCounter = 0;
  this.discountRate = discountParam;
  this.frequencyN = nthCustomerParam;
  this.itemPriceMapping = new Map();

  for (let idx = 0; idx < productsArray.length; idx++) {
    this.itemPriceMapping.set(productsArray[idx], pricesArray[idx]);
  }
};

Cashier.prototype.getBill = function (purchasedProductIds, purchasedAmounts) {
  this.customerVisitCounter++;
  let currentOrderTotal = 0;
  let billIndex = 0;
  const itemsCount = purchasedProductIds.length;

  while (billIndex < itemsCount) {
    const productKey = purchasedProductIds[billIndex];
    const productAmount = purchasedAmounts[billIndex];
    const productUnitPrice = this.itemPriceMapping.get(productKey);
    currentOrderTotal += productUnitPrice * productAmount;
    billIndex++;
  }

  if (this.customerVisitCounter % this.frequencyN === 0) {
    const discountedTotal =
      (currentOrderTotal * (100 - this.discountRate)) / 100;
    return discountedTotal;
  }

  return currentOrderTotal;
};

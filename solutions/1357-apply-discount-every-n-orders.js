/**
 * Apply Discount Every N Orders
 * Intuition: Map product id to price. Every nth bill multiplies the subtotal by (100-discount)/100.
 * Approach: 1. Constructor stores n, discount, and id→price. 2. getBill increments the customer counter, sums price*qty. 3. If counter % n == 0, apply discount. 4. Return the bill.
 * Dry Run: n=3, discount=50, products [1,2] prices [5,10]. First two bills full price; third bill half off.
 * Time Complexity: O(P)
 * Space Complexity: O(P)
 */
var Cashier = function (
  nthCustomerParam,
  discountParam,
  productsArray,
  pricesArray
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

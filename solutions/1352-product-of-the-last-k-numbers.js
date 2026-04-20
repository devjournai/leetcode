/**
 * Product Of The Last K Numbers
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var ProductOfNumbers = function () {
  this.prefixProductsArray = [1];
};

ProductOfNumbers.prototype.add = function (num) {
  if (num === 0) {
    this.prefixProductsArray = [1];
  } else {
    let lastProductValue =
      this.prefixProductsArray[this.prefixProductsArray.length - 1];
    let newProductValue = lastProductValue * num;
    this.prefixProductsArray.push(newProductValue);
  }
};

ProductOfNumbers.prototype.getProduct = function (k) {
  let currentProductsCount = this.prefixProductsArray.length;
  if (k >= currentProductsCount) {
    return 0;
  } else {
    let entireProduct = this.prefixProductsArray[currentProductsCount - 1];
    let productBeforeKth =
      this.prefixProductsArray[currentProductsCount - 1 - k];
    let requiredProduct = entireProduct / productBeforeKth;
    return requiredProduct;
  }
};

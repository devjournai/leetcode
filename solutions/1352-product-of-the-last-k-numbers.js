/**
 * Product Of The Last K Numbers
 * Intuition: Prefix products give last-k product as prefix[n]/prefix[n-k]. A 0 resets the prefix because later products must not include it.
 * Approach: 1. Store prefixProducts starting at [1]. 2. add(0) resets to [1]; else push last*num. 3. getProduct(k) is 0 if k ≥ length, else last/prefix[len-1-k].
 * Dry Run: add 3,0,2,5,4. getProduct(2)=20, getProduct(3)=40, getProduct(4)=0.
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

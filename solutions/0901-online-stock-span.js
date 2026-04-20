/**
 * Online Stock Span
 * Time Complexity: O(1)
 * Space Complexity: O(N)
 */
var StockSpanner = function () {
  this.priceAndSpanStack = [];
};

StockSpanner.prototype.next = function (price) {
  let currentSpan = 1;

  while (this.priceAndSpanStack.length > 0) {
    let topElement = this.priceAndSpanStack[this.priceAndSpanStack.length - 1];
    let recordedPrice = topElement[0];
    let recordedSpan = topElement[1];

    if (price >= recordedPrice) {
      currentSpan += recordedSpan;
      this.priceAndSpanStack.pop();
    } else {
      break;
    }
  }

  this.priceAndSpanStack.push([price, currentSpan]);

  return currentSpan;
};

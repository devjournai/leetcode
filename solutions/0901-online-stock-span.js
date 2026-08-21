/**
 * Online Stock Span
 * Intuition: The span is 1 plus the collapsed spans of a monotonic decreasing stack of previous prices. While the new price is ≥ the stack top, pop and add that stored span.
 * Approach: 1. `priceAndSpanStack` holds `[price, span]`. 2. `next`: start span 1; while stack nonempty and `price >= recordedPrice`, add `recordedSpan` and pop. 3. Push `[price, currentSpan]` and return it.
 * Dry Run: prices 100, 80, 60, 70, 60, 75, 85.
 *   - Spans 1,1,1, then 70 pops 60 → 2; 60 → 1; 75 pops 60 and 70 → 4; 85 pops 75 and 80 → 6.
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

/**
 * Design Most Recently Used Queue
 * Intuition: The queue is 1..n. `fetch(k)` returns the k-th (1-based) element and moves it to the back—an array shift.
 * Approach: 1. Constructor fills `storedItems` with 1..n. 2. `fetch`: read index k-1, slide later elements left, write the value at the end. 3. Return the extracted item.
 * Dry Run: n=8, fetch(3)
 * [1,2,3,4,5,6,7,8] → extract 3 → [1,2,4,5,6,7,8,3], return 3.
 * Time Complexity: Constructor O(n), fetch O(n)
 * Space Complexity: Constructor O(n), fetch O(1)
 */
var MRUQueue = function (elementsTotal) {
  this.storedItems = [];
  for (
    let enumerationIndex = 0;
    enumerationIndex < elementsTotal;
    enumerationIndex++
  ) {
    this.storedItems.push(enumerationIndex + 1);
  }
};

MRUQueue.prototype.fetch = function (retrievePosition) {
  const itemToExtract = this.storedItems[retrievePosition - 1];

  let currentCursor = retrievePosition - 1;
  while (currentCursor < this.storedItems.length - 1) {
    this.storedItems[currentCursor] = this.storedItems[currentCursor + 1];
    currentCursor++;
  }

  this.storedItems[this.storedItems.length - 1] = itemToExtract;

  return itemToExtract;
};

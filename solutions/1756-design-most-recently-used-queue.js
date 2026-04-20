/**
 * Design Most Recently Used Queue
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

/**
 * Moving Average From Data Stream
 * Time Complexity: O(k)
 * Space Complexity: O(k)
*/
var MovingAverage = function (sizeLimit) {
  this.valueQueue = [];
  this.currentSumTotal = 0;
  this.windowCapacity = sizeLimit;
};

MovingAverage.prototype.next = function (nextValue) {
  this.valueQueue.push(nextValue);
  this.currentSumTotal += nextValue;

  if (this.valueQueue.length > this.windowCapacity) {
    const oldestEntry = this.valueQueue.shift();
    this.currentSumTotal -= oldestEntry;
  }

  const actualWindowSize = this.valueQueue.length;
  const calculatedAverage = this.currentSumTotal / actualWindowSize;
  return calculatedAverage;
};
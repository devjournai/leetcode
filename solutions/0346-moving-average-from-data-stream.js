/**
 * Moving Average From Data Stream
 * Intuition: A queue of at most windowCapacity values plus a running sum gives O(1) average after each insertion (aside from the shift of the dropped head).
 * Approach: 1. Constructor stores an empty queue, sum 0, and the size limit. 2. next pushes the value and adds it to the sum. 3. If length exceeds capacity, shift the oldest and subtract it. 4. Return sum / current length.
 * Dry Run: sizeLimit = 3; next(1), next(10), next(3), next(5).
 *   - Averages 1, then 5.5, then 14/3. After 5, drop 1 → (10+3+5)/3 = 6.
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

/**
 * Design an Array Statistics Tracker
 * Intuition: Maintain the insertion order in a queue, a running sum for the mean, a sorted list for the median, and frequency counts for the mode. Mean and median are then O(1)/O(n) reads; mode is the smallest value among those with maximum frequency.
 * Approach: 1. `addNumber`: push to queue, add to sorted array (binary insert), bump count, add to sum. 2. `removeFirstAddedNumber`: pop queue front, binary-remove from sorted array, decrement count, subtract from sum. 3. `getMean`: trunc(sum / n). 4. `getMedian`: sorted[n/2] (larger middle when even). 5. `getMode`: scan counts for max frequency, break ties by smaller number.
 * Dry Run: add 1, add 2, add 2. Mean floor(5/3)=1. Median sorted[1]=2. Mode 2. removeFirst drops 1; mean 2, median 2, mode 2.
 * Time Complexity: add/remove O(N); mean O(1); median O(1); mode O(U)
 * Space Complexity: O(N)
 */
var StatisticsTracker = function () {
  this.insertionOrder = [];
  this.sortedValues = [];
  this.frequencyByValue = new Map();
  this.totalSum = 0;
};

StatisticsTracker.prototype.binarySearchInsertIndex = function (value) {
  let low = 0;
  let high = this.sortedValues.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (this.sortedValues[mid] < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
};

StatisticsTracker.prototype.addNumber = function (number) {
  this.insertionOrder.push(number);
  this.sortedValues.splice(this.binarySearchInsertIndex(number), 0, number);
  this.frequencyByValue.set(
    number,
    (this.frequencyByValue.get(number) || 0) + 1
  );
  this.totalSum += number;
};

StatisticsTracker.prototype.removeFirstAddedNumber = function () {
  const number = this.insertionOrder.shift();
  const removeIndex = this.binarySearchInsertIndex(number);
  this.sortedValues.splice(removeIndex, 1);
  const nextFrequency = this.frequencyByValue.get(number) - 1;
  if (nextFrequency === 0) {
    this.frequencyByValue.delete(number);
  } else {
    this.frequencyByValue.set(number, nextFrequency);
  }
  this.totalSum -= number;
};

StatisticsTracker.prototype.getMean = function () {
  return Math.trunc(this.totalSum / this.insertionOrder.length);
};

StatisticsTracker.prototype.getMedian = function () {
  return this.sortedValues[Math.floor(this.sortedValues.length / 2)];
};

StatisticsTracker.prototype.getMode = function () {
  let bestValue = Infinity;
  let bestFrequency = 0;
  for (const [value, frequency] of this.frequencyByValue) {
    if (
      frequency > bestFrequency ||
      (frequency === bestFrequency && value < bestValue)
    ) {
      bestFrequency = frequency;
      bestValue = value;
    }
  }
  return bestValue;
};

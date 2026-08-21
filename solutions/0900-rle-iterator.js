/**
 * Rle Iterator
 * Intuition: Store only positive-count `[freq, value]` pairs and a cursor (`currentRecordIndex`, `consumedFromCurrent`). Each `next(n)` walks forward, exhausting whole runs until `n` is spent inside a run, then returns that run's value.
 * Approach: 1. Constructor: skip zero frequencies, push `[frequencyOfValue, actualValue]`. 2. `next`: while n remains and records remain, if n > leftover in current run, subtract leftover and advance the record; else add n to `consumedFromCurrent` and return the value. 3. Exhausted → -1.
 * Dry Run: encoding = [3,8,0,9,2,5], next(2) then next(1) then next(1) then next(2).
 *   - Records [[3,8],[2,5]]. next(2)→8 (consumed 2 of 8s). next(1)→8 (run done). next(1)→5. next(2) exhausts → -1.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var RLEIterator = function (encoding) {
  this.rleRecords = [];
  this.currentRecordIndex = 0;
  this.consumedFromCurrent = 0;

  for (let recordIndex = 0; recordIndex < encoding.length; recordIndex += 2) {
    let frequencyOfValue = encoding[recordIndex];
    let actualValue = encoding[recordIndex + 1];
    if (frequencyOfValue > 0) {
      this.rleRecords.push([frequencyOfValue, actualValue]);
    }
  }
};

RLEIterator.prototype.next = function (n) {
  let elementsRemaining = n;

  while (
    this.currentRecordIndex < this.rleRecords.length &&
    elementsRemaining > 0
  ) {
    let recordData = this.rleRecords[this.currentRecordIndex];
    let totalFrequency = recordData[0];
    let actualValueResult = recordData[1];
    let currentlyAvailable = totalFrequency - this.consumedFromCurrent;

    if (elementsRemaining > currentlyAvailable) {
      elementsRemaining -= currentlyAvailable;
      this.consumedFromCurrent = 0;
      this.currentRecordIndex++;
    } else {
      this.consumedFromCurrent += elementsRemaining;
      elementsRemaining = 0;
      return actualValueResult;
    }
  }

  return -1;
};

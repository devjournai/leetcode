/**
 * Rle Iterator
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

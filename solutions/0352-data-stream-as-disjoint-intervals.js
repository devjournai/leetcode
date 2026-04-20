/**
 * Data Stream As Disjoint Intervals
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var SummaryRanges = function () {
  this.valuesSeen = [];
};

SummaryRanges.prototype.addNum = function (value) {
  this.valuesSeen[value] = true;
};

SummaryRanges.prototype.getIntervals = function () {
  const resultIntervals = [];
  let currentPosition = 0;
  const maxPosition = this.valuesSeen.length;

  while (currentPosition < maxPosition) {
    if (this.valuesSeen[currentPosition]) {
      let intervalStart = currentPosition;
      let scanPointer = currentPosition;
      while (scanPointer < maxPosition && this.valuesSeen[scanPointer]) {
        scanPointer++;
      }
      let intervalEnd = scanPointer - 1;
      resultIntervals.push([intervalStart, intervalEnd]);
      currentPosition = scanPointer;
    } else {
      currentPosition++;
    }
  }

  return resultIntervals;
};

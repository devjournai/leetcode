/**
 * Data Stream As Disjoint Intervals
 * Intuition: Treat each added number as a boolean occupancy flag in a sparse array; disjoint intervals are just maximal runs of consecutive true slots when we scan left to right.
 * Approach: 1. `addNum` sets `valuesSeen[value] = true`. 2. `getIntervals` walks indices 0..length-1; on a true cell it extends `scanPointer` while occupancy stays true, then emits `[intervalStart, scanPointer - 1]` and jumps past that run.
 * Dry Run: add 1, 3, 2 → occupancy at 1,2,3. Scan skips 0, finds start 1, walks through 3, emits [[1, 3]].
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

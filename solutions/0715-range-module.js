/**
 * Range Module
 * Intuition: Keep disjoint half-open intervals in `trackedIntervals`. Add merges anything that overlaps `[left, right)`; remove splits leftovers; query succeeds only if some stored interval fully covers the query.
 * Approach: 1. `addRange` copies intervals completely left of the new range, unions overlapping ones into `[leftValueToAdd, rightValueToAdd)`, then copies intervals completely to the right. 2. `queryRange` scans until an interval starts after `queryLeft` or one contains `[queryLeft, queryRight)`. 3. `removeRange` keeps disjoint intervals and clips overlap into a left stub and/or a right stub.
 * Dry Run: add [10,20), add [20,25) → [10,25). query [10,25) true. remove [14,16) → [10,14) and [16,25).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var RangeModule = function () {
  this.trackedIntervals = [];
};

RangeModule.prototype.addRange = function (leftValueToAdd, rightValueToAdd) {
  let newRangesAccumulator = [];
  let hasMerged = false;
  let iterationCounter = 0;
  const totalExistingRanges = this.trackedIntervals.length;

  while (iterationCounter < totalExistingRanges) {
    const currentRangeBegin = this.trackedIntervals[iterationCounter][0];
    const currentRangeEnd = this.trackedIntervals[iterationCounter][1];

    if (currentRangeEnd < leftValueToAdd) {
      newRangesAccumulator.push([currentRangeBegin, currentRangeEnd]);
    } else if (currentRangeBegin > rightValueToAdd) {
      if (!hasMerged) {
        newRangesAccumulator.push([leftValueToAdd, rightValueToAdd]);
        hasMerged = true;
      }
      newRangesAccumulator.push([currentRangeBegin, currentRangeEnd]);
    } else {
      leftValueToAdd = Math.min(leftValueToAdd, currentRangeBegin);
      rightValueToAdd = Math.max(rightValueToAdd, currentRangeEnd);
    }
    iterationCounter++;
  }

  if (!hasMerged) {
    newRangesAccumulator.push([leftValueToAdd, rightValueToAdd]);
  }

  this.trackedIntervals = newRangesAccumulator;
};

RangeModule.prototype.queryRange = function (queryLeft, queryRight) {
  let searchIndex = 0;
  const totalAvailableRanges = this.trackedIntervals.length;

  while (searchIndex < totalAvailableRanges) {
    const currentRangeStart = this.trackedIntervals[searchIndex][0];
    const currentRangeEnd = this.trackedIntervals[searchIndex][1];

    if (currentRangeStart <= queryLeft && currentRangeEnd >= queryRight) {
      return true;
    }
    if (currentRangeStart > queryLeft) {
      return false;
    }
    searchIndex++;
  }
  return false;
};

RangeModule.prototype.removeRange = function (removalLeft, removalRight) {
  let newCollectionOfRanges = [];
  const existingRangeCount = this.trackedIntervals.length;

  for (
    let rangeIterator = 0;
    rangeIterator < existingRangeCount;
    rangeIterator++
  ) {
    const currentIntervalStart = this.trackedIntervals[rangeIterator][0];
    const currentIntervalEnd = this.trackedIntervals[rangeIterator][1];

    if (
      currentIntervalEnd <= removalLeft ||
      currentIntervalStart >= removalRight
    ) {
      newCollectionOfRanges.push([currentIntervalStart, currentIntervalEnd]);
    } else {
      if (currentIntervalStart < removalLeft) {
        newCollectionOfRanges.push([currentIntervalStart, removalLeft]);
      }
      if (currentIntervalEnd > removalRight) {
        newCollectionOfRanges.push([removalRight, currentIntervalEnd]);
      }
    }
  }
  this.trackedIntervals = newCollectionOfRanges;
};

/**
 * Count Integers In Intervals
 * Intuition: Maintain a sorted list of non-overlapping intervals and update a total count of covered integers. When a new interval is added, find all overlapping intervals, merge them with the new one into a single consolidated interval, update the total count by subtracting the length of merged old intervals and adding the length of the new consolidated interval, then replace the old intervals with the new one in the sorted list.
 * Approach: 1. Initialize `totalCoverage` to 0 and `storedIntervals` with sentinel intervals `[-Infinity, -Infinity]` and `[Infinity, Infinity]` to simplify edge cases. 2. For `add(left, right)`: a. Use a binary search helper `findLowerBound` to locate the first interval whose start is greater than or equal to `left - 1`. Adjust this index backward if the preceding interval's end already covers `left - 1`. This gives `effectiveLeftIndex`. b. Use a binary search helper `findUpperBound` to locate the first interval whose start is strictly greater than `right + 1`. This gives `effectiveRightIndex`. c. Determine the `newLeftValue` as the minimum of `left` and the start of the interval at `effectiveLeftIndex`. d. Determine the `newRightValue` as the maximum of `right` and the end of the interval at `effectiveRightIndex - 1`. e. Calculate `removedIntervalsLength` by summing the lengths of all intervals from `effectiveLeftIndex` up to `effectiveRightIndex - 1`. f. Update `totalCoverage` by adding the length of the new consolidated interval (`newRightValue - newLeftValue + 1`) and subtracting `removedIntervalsLength`. g. Use `splice` to remove the old intervals (from `effectiveLeftIndex` to `effectiveRightIndex - effectiveLeftIndex` count) and insert the `[newLeftValue, newRightValue]` consolidated interval at `effectiveLeftIndex`. 3. For `count()`: Return `totalCoverage`.
 * Dry Run:
 * CountIntervals(): totalCoverage = 0, storedIntervals = [[-Infinity, -Infinity], [Infinity, Infinity]]
 * add(2, 3):
 *   inputLeft = 2, inputRight = 3
 *   effectiveLeftIndex = findLowerBound(storedIntervals, 1) returns 1 (points to [Infinity, Infinity])
 *   storedIntervals[0][1] = -Infinity, -Infinity >= 1 is false. effectiveLeftIndex remains 1.
 *   newLeftValue = Math.min(storedIntervals[1][0], 2) = Math.min(Infinity, 2) = 2
 *   effectiveRightIndex = findUpperBound(storedIntervals, 4) returns 1 (points to [Infinity, Infinity])
 *   newRightValue = Math.max(storedIntervals[0][1], 3) = Math.max(-Infinity, 3) = 3
 *   removedIntervalsLength = 0 (loop effectiveLeftIndex=1 to effectiveRightIndex=1 does not run)
 *   totalCoverage += (3 - 2 + 1) - 0 = 2. totalCoverage = 2.
 *   storedIntervals.splice(1, 0, [2, 3]). storedIntervals = [[-Infinity, -Infinity], [2, 3], [Infinity, Infinity]]
 * add(7, 10):
 *   inputLeft = 7, inputRight = 10
 *   effectiveLeftIndex = findLowerBound(storedIntervals, 6) returns 2 (points to [Infinity, Infinity])
 *   storedIntervals[1][1] = 3, 3 >= 6 is false. effectiveLeftIndex remains 2.
 *   newLeftValue = Math.min(storedIntervals[2][0], 7) = Math.min(Infinity, 7) = 7
 *   effectiveRightIndex = findUpperBound(storedIntervals, 11) returns 2 (points to [Infinity, Infinity])
 *   newRightValue = Math.max(storedIntervals[1][1], 10) = Math.max(3, 10) = 10
 *   removedIntervalsLength = 0
 *   totalCoverage += (10 - 7 + 1) - 0 = 4. totalCoverage = 2 + 4 = 6.
 *   storedIntervals.splice(2, 0, [7, 10]). storedIntervals = [[-Infinity, -Infinity], [2, 3], [7, 10], [Infinity, Infinity]]
 * add(5, 5):
 *   inputLeft = 5, inputRight = 5
 *   effectiveLeftIndex = findLowerBound(storedIntervals, 4) returns 2 (points to [7, 10])
 *   storedIntervals[1][1] = 3, 3 >= 4 is false. effectiveLeftIndex remains 2.
 *   newLeftValue = Math.min(storedIntervals[2][0], 5) = Math.min(7, 5) = 5
 *   effectiveRightIndex = findUpperBound(storedIntervals, 6) returns 2 (points to [7, 10])
 *   newRightValue = Math.max(storedIntervals[1][1], 5) = Math.max(3, 5) = 5
 *   removedIntervalsLength = 0
 *   totalCoverage += (5 - 5 + 1) - 0 = 1. totalCoverage = 6 + 1 = 7.
 *   storedIntervals.splice(2, 0, [5, 5]). storedIntervals = [[-Infinity, -Infinity], [2, 3], [5, 5], [7, 10], [Infinity, Infinity]]
 * count(): returns totalCoverage = 7.
 * Time Complexity: O(logN + K)
 * Space Complexity: O(N)
 */
var CountIntervals = function () {
  this.totalCoverage = 0;
  this.storedIntervals = [
    [-Infinity, -Infinity],
    [Infinity, Infinity],
  ];
};

/**
 * @param {number} left
 * @param {number} right
 * @return {void}
 */
CountIntervals.prototype.add = function (inputLeft, inputRight) {
  function findLowerBound(collectionForLowerSearch, lowerSearchTarget) {
    let beginningIndex = 0;
    let endingIndex = collectionForLowerSearch.length;
    while (beginningIndex < endingIndex) {
      const middleSearchIndex = Math.floor((beginningIndex + endingIndex) / 2);
      if (collectionForLowerSearch[middleSearchIndex][0] < lowerSearchTarget) {
        beginningIndex = middleSearchIndex + 1;
      } else {
        endingIndex = middleSearchIndex;
      }
    }
    return beginningIndex;
  }

  function findUpperBound(
    collectionForUpperSearch,
    upperSearchTargetExclusive,
  ) {
    let firstIndex = 0;
    let lastIndex = collectionForUpperSearch.length;
    while (firstIndex < lastIndex) {
      const midPointSearch = Math.floor((firstIndex + lastIndex) / 2);
      if (
        collectionForUpperSearch[midPointSearch][0] <=
        upperSearchTargetExclusive
      ) {
        firstIndex = midPointSearch + 1;
      } else {
        lastIndex = midPointSearch;
      }
    }
    return firstIndex;
  }

  let effectiveLeftIndex = findLowerBound(this.storedIntervals, inputLeft - 1);
  if (this.storedIntervals[effectiveLeftIndex - 1][1] >= inputLeft - 1) {
    effectiveLeftIndex -= 1;
  }

  const newLeftValue = Math.min(
    this.storedIntervals[effectiveLeftIndex][0],
    inputLeft,
  );
  const effectiveRightIndex = findUpperBound(
    this.storedIntervals,
    inputRight + 1,
  );
  const newRightValue = Math.max(
    this.storedIntervals[effectiveRightIndex - 1][1],
    inputRight,
  );

  let removedIntervalsLength = 0;
  for (
    let currentMergePointer = effectiveLeftIndex;
    currentMergePointer < effectiveRightIndex;
    currentMergePointer++
  ) {
    removedIntervalsLength +=
      this.storedIntervals[currentMergePointer][1] -
      this.storedIntervals[currentMergePointer][0] +
      1;
  }

  this.totalCoverage +=
    newRightValue - newLeftValue + 1 - removedIntervalsLength;
  const mergedIntervalData = [newLeftValue, newRightValue];
  this.storedIntervals.splice(
    effectiveLeftIndex,
    effectiveRightIndex - effectiveLeftIndex,
    mergedIntervalData,
  );
};

/**
 * @return {number}
 */
CountIntervals.prototype.count = function () {
  return this.totalCoverage;
};

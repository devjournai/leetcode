/**
 * Find Right Interval
 * Intuition: The right interval is the one whose start is the smallest value ≥ this interval’s end. Sort starts and binary-search that threshold.
 * Approach: 1. Map each interval to `{startCoordinate, originalIndex}` and sort by start. 2. For each interval, lower-bound search `requiredEndValue`. 3. If `searchLowerBound` is in range, store that original index, else -1.
 * Dry Run: [[1,2],[2,3],[3,4]]. Sorted starts 1,2,3. End 2 → index 1; end 3 → index 2; end 4 → -1. Return [1,2,-1].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var findRightInterval = function (intervals) {
  const sortedStartValues = intervals.map((intervalPair, initialPosition) => ({
    startCoordinate: intervalPair[0],
    originalIndex: initialPosition,
  }));

  sortedStartValues.sort(
    (firstElement, secondElement) =>
      firstElement.startCoordinate - secondElement.startCoordinate
  );

  const resultingIndices = new Array(intervals.length);

  for (
    let currentPosition = 0;
    currentPosition < intervals.length;
    currentPosition++
  ) {
    const requiredEndValue = intervals[currentPosition][1];

    let searchLowerBound = 0;
    let searchUpperBound = sortedStartValues.length;

    while (searchLowerBound < searchUpperBound) {
      const midPoint = Math.floor((searchLowerBound + searchUpperBound) / 2);
      if (sortedStartValues[midPoint].startCoordinate < requiredEndValue) {
        searchLowerBound = midPoint + 1;
      } else {
        searchUpperBound = midPoint;
      }
    }

    if (searchLowerBound < sortedStartValues.length) {
      resultingIndices[currentPosition] =
        sortedStartValues[searchLowerBound].originalIndex;
    } else {
      resultingIndices[currentPosition] = -1;
    }
  }

  return resultingIndices;
};

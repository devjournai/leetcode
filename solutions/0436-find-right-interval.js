/**
 * Find Right Interval
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
*/
var findRightInterval = function (intervals) {
  const sortedStartValues = intervals.map((intervalPair, initialPosition) => ({
    startCoordinate: intervalPair[0],
    originalIndex: initialPosition
  }));

  sortedStartValues.sort((firstElement, secondElement) => firstElement.startCoordinate - secondElement.startCoordinate);

  const resultingIndices = new Array(intervals.length);

  for (let currentPosition = 0; currentPosition < intervals.length; currentPosition++) {
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
      resultingIndices[currentPosition] = sortedStartValues[searchLowerBound].originalIndex;
    } else {
      resultingIndices[currentPosition] = -1;
    }
  }

  return resultingIndices;
};
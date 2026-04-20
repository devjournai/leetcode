/**
 * Set Intersection Size At Least Two
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var intersectionSizeTwo = function (intervals) {
  intervals.sort((firstIntervalElement, secondIntervalElement) => {
    const firstIntervalEnd = firstIntervalElement[1];
    const secondIntervalEnd = secondIntervalElement[1];
    const firstIntervalStart = firstIntervalElement[0];
    const secondIntervalStart = secondIntervalElement[0];

    if (firstIntervalEnd !== secondIntervalEnd) {
      return firstIntervalEnd - secondIntervalEnd;
    }
    return secondIntervalStart - firstIntervalStart;
  });

  let cumulativeSetSize = 0;
  let mostRecentPoint = -1;
  let secondMostRecentPoint = -1;

  for (
    let currentIntervalIterator = 0;
    currentIntervalIterator < intervals.length;
    ++currentIntervalIterator
  ) {
    const currentIntervalEntry = intervals[currentIntervalIterator];
    const currentEntryStart = currentIntervalEntry[0];
    const currentEntryEnd = currentIntervalEntry[1];

    if (currentEntryStart <= mostRecentPoint) {
      continue;
    } else if (currentEntryStart <= secondMostRecentPoint) {
      mostRecentPoint = secondMostRecentPoint;
      secondMostRecentPoint = currentEntryEnd;
      cumulativeSetSize++;
    } else {
      mostRecentPoint = currentEntryEnd - 1;
      secondMostRecentPoint = currentEntryEnd;
      cumulativeSetSize += 2;
    }
  }

  return cumulativeSetSize;
};

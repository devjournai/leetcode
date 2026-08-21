/**
 * Two Best Non-Overlapping Events
 * Intuition: After sorting by end time, the best partner for an event is the highest-value event that ended strictly before it starts.
 * Approach: 1. Sort events by end time and build prefix maxima of values. 2. For each event, binary-search the last event ending before it starts. 3. Take max of one event, or that event plus the prefix max of the prior event.
 * Dry Run: events = [[1,3,2],[4,5,2],[2,4,3]]. Sorted by end: [1,3,2], [2,4,3], [4,5,2]. Prefix max = [2,3,3]. For [4,5,2], last ending before 4 is [1,3,2]; sum = 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maxTwoEvents = function (eventCollection) {
  let sortedEvents = [...eventCollection];
  sortedEvents.sort((eventA, eventB) => eventA[1] - eventB[1]);

  let currentMaxIndividualValue = 0;
  const prefixMaximums = sortedEvents.map((anEvent) => {
    currentMaxIndividualValue = Math.max(currentMaxIndividualValue, anEvent[2]);
    return currentMaxIndividualValue;
  });

  let overallMaximumSum = 0;
  for (
    let eventIterator = 0;
    eventIterator < sortedEvents.length;
    ++eventIterator
  ) {
    const currentSelectedEvent = sortedEvents[eventIterator];
    overallMaximumSum = Math.max(overallMaximumSum, currentSelectedEvent[2]);

    let leftBoundary = 0;
    let rightBoundary = eventIterator - 1;
    let foundOptimalPriorIndex = -1;

    while (leftBoundary <= rightBoundary) {
      const midPoint = Math.floor((leftBoundary + rightBoundary) / 2);
      if (sortedEvents[midPoint][1] < currentSelectedEvent[0]) {
        foundOptimalPriorIndex = midPoint;
        leftBoundary = midPoint + 1;
      } else {
        rightBoundary = midPoint - 1;
      }
    }

    if (foundOptimalPriorIndex !== -1) {
      overallMaximumSum = Math.max(
        overallMaximumSum,
        currentSelectedEvent[2] + prefixMaximums[foundOptimalPriorIndex]
      );
    }
  }

  return overallMaximumSum;
};

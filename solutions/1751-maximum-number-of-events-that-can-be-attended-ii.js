/**
 * Maximum Number Of Events That Can Be Attended II
 * Intuition: Attend at most `k` non-overlapping events for max value. Sort by start; `dp[k'][i]` is the best from events i.. using up to k' attendances. Binary search the next event that starts after the current end.
 * Approach: 1. Sort `events` by start. 2. `findNextAvailableEvent` lower-bounds start > end day. 3. Fill `dpTable` from the right: skip vs take + dp[k-1][next]. 4. Return `dpTable[k][0]`.
 * Dry Run: events = [[1,2,4],[3,4,3],[2,3,1]], k = 2
 * Take [1,2,4] then [3,4,3] = 7 (cannot take all three).
 * Time Complexity: O(N * K * logN)
 * Space Complexity: O(N * K)
 */
var maxValue = function (events, k) {
  events.sort((eventA, eventB) => eventA[0] - eventB[0]);
  const totalEventsCount = events.length;

  const dpTable = Array.from({ length: k + 1 }, () =>
    new Array(totalEventsCount + 1).fill(0)
  );

  const findNextAvailableEvent = (startIndexForSearch, endingDayToBeat) => {
    let currentLowBound = startIndexForSearch;
    let currentHighBound = totalEventsCount;
    let resultIndex = totalEventsCount;

    for (; currentLowBound < currentHighBound;) {
      const centerPoint = Math.floor((currentLowBound + currentHighBound) / 2);
      if (events[centerPoint][0] > endingDayToBeat) {
        resultIndex = centerPoint;
        currentHighBound = centerPoint;
      } else {
        currentLowBound = centerPoint + 1;
      }
    }
    return resultIndex;
  };

  for (
    let currentEventsAllowed = 1;
    currentEventsAllowed <= k;
    currentEventsAllowed++
  ) {
    for (
      let eventCursor = totalEventsCount - 1;
      eventCursor >= 0;
      eventCursor--
    ) {
      const currentEventDetails = events[eventCursor];
      const currentEventValue = currentEventDetails[2];
      const currentEventEndingDay = currentEventDetails[1];

      const valueForSkipping = dpTable[currentEventsAllowed][eventCursor + 1];

      const nextPossibleEventIndex = findNextAvailableEvent(
        eventCursor + 1,
        currentEventEndingDay
      );

      const valueForAttending =
        currentEventValue +
        dpTable[currentEventsAllowed - 1][nextPossibleEventIndex];

      dpTable[currentEventsAllowed][eventCursor] = Math.max(
        valueForSkipping,
        valueForAttending
      );
    }
  }

  return dpTable[k][0];
};

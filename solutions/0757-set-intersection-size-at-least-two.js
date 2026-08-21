/**
 * Set Intersection Size At Least Two
 * Intuition: A smallest hitting set can be built greedily: sort intervals by end (and by later start on ties) and always place the last two unused points at the current interval’s right end.
 * Approach: 1. Sort by `end` ascending, then `start` descending. 2. Track `mostRecentPoint` and `secondMostRecentPoint` (the two largest chosen numbers). 3. If `start <= mostRecentPoint`, the interval already has two hits — skip. 4. If `start <= secondMostRecentPoint`, it has one hit: add `end` (`cumulativeSetSize++`). 5. Else add `end-1` and `end` (`+= 2`). Return `cumulativeSetSize`.
 * Dry Run: intervals = [[1,3],[1,4],[2,5],[3,5]].
 *   - Sorted by end: [1,3], [1,4], [2,5], [3,5].
 *   - [1,3]: pick 2 and 3, size 2.
 *   - [1,4] and [2,5]: start ≤ 2, already two hits.
 *   - [3,5]: start 3 ≤ 3, one hit → add 5, size 3. Return 3.
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

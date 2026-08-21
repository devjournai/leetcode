/**
 * Non Overlapping Intervals
 * Intuition: Greedy by earliest end time: keep a non-overlapping chain and drop any interval that starts before the last kept end.
 * Approach: 1. Empty → 0. 2. Sort by end (`firstPair[1]`). 3. `previousEndingPoint` = first end. 4. If `currentStartingPoint < previousEndingPoint`, increment removals; else update the end. 5. Return removals.
 * Dry Run: [[1,2],[2,3],[1,3],[3,4]]. Sorted by end. Keep [1,2], keep [2,3], drop [1,3], keep [3,4]. Return 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var eraseOverlapIntervals = function (intervalBounds) {
  if (intervalBounds.length === 0) {
    return 0;
  }

  intervalBounds.sort((firstPair, secondPair) => firstPair[1] - secondPair[1]);

  let removedIntervalsCounter = 0;
  let previousEndingPoint = intervalBounds[0][1];

  for (let indexValue = 1; indexValue < intervalBounds.length; indexValue++) {
    const currentRange = intervalBounds[indexValue];
    const currentStartingPoint = currentRange[0];
    const currentEndingPoint = currentRange[1];

    if (currentStartingPoint < previousEndingPoint) {
      removedIntervalsCounter++;
    } else {
      previousEndingPoint = currentEndingPoint;
    }
  }

  return removedIntervalsCounter;
};

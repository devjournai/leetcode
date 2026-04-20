/**
 * Remove Covered Intervals
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var removeCoveredIntervals = function (intervals) {
  if (!intervals || intervals.length === 0) {
    return 0;
  }

  intervals.sort((firstIntervalElement, secondIntervalElement) => {
    if (firstIntervalElement[0] !== secondIntervalElement[0]) {
      return firstIntervalElement[0] - secondIntervalElement[0];
    }
    return secondIntervalElement[1] - firstIntervalElement[1];
  });

  let countOfNonCovered = 0;
  let greatestEndSeen = -1;

  for (const currentIntervalEntry of intervals) {
    let currentIntervalBegin = currentIntervalEntry[0];
    let currentIntervalFinish = currentIntervalEntry[1];

    if (currentIntervalFinish > greatestEndSeen) {
      countOfNonCovered++;
      greatestEndSeen = currentIntervalFinish;
    }
  }

  return countOfNonCovered;
};

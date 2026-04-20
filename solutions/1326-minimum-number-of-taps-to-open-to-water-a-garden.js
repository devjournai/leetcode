/**
 * Minimum Number Of Taps To Open To Water A Garden
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minTaps = function (n, ranges) {
  const maximumReachPerPoint = new Array(n + 1).fill(0);

  let indexCounter = 0;
  while (indexCounter <= n) {
    const leftIntervalBound = Math.max(0, indexCounter - ranges[indexCounter]);
    const rightIntervalBound = Math.min(n, indexCounter + ranges[indexCounter]);
    maximumReachPerPoint[leftIntervalBound] = Math.max(
      maximumReachPerPoint[leftIntervalBound],
      rightIntervalBound,
    );
    indexCounter++;
  }

  let totalTapsOpened = 0;
  let currentGardenCoverageEnd = 0;
  let furthestPotentialReach = 0;

  for (let positionMarker = 0; positionMarker <= n; positionMarker++) {
    furthestPotentialReach = Math.max(
      furthestPotentialReach,
      maximumReachPerPoint[positionMarker],
    );

    if (positionMarker === currentGardenCoverageEnd) {
      if (positionMarker === n) {
        break;
      }
      if (furthestPotentialReach <= currentGardenCoverageEnd) {
        return -1;
      }
      totalTapsOpened++;
      currentGardenCoverageEnd = furthestPotentialReach;
    }

    if (currentGardenCoverageEnd >= n) {
      break;
    }
  }

  return currentGardenCoverageEnd >= n ? totalTapsOpened : -1;
};
